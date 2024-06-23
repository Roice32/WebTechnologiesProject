import fs from 'fs';
import fetchData from '../services/data_fetcher.js';
import sendReport from '../services/post_report.js';
import login from '../services/login.js';
import fetchOpenReports from '../services/get_open_reports.js';
import resolveReport from '../services/resolve_report.js';
import { fetchAppProperties } from '../shared.js';
import downloadDatasets from '../services/dataset_downloader.js';
import updateDatabaseFromDatasets from '../services/database_updater.js';
import { tokenIsValid } from '../jwt.js';

async function getUnemploymentData(parameters, res) {
    try {
        const { monthsCount, criterion, counties } = parameters;
        const data = await fetchData(monthsCount, criterion, counties);
        const dataArray = Array.from(data.entries());
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(dataArray));
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: error.message }));
    }
}

async function postReport(parameters, res) {
    const { email, type, description } = parameters;
    await sendReport(email, type, description);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Raport trimis cu succes administratorilor platformei.' }));
}

async function getOpenReports(res) {
    try {
        const reports = await fetchOpenReports();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(reports));
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: error.message }));
    }
}

async function loginAdmin(parameters, res) {
    const { username, password } = parameters;
    const loginStatus = await login(username, password);
    if (loginStatus.length > 3) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ adminToken: loginStatus }));
        return;
    }
    if (loginStatus === '404') {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Admin not found' }));
    } else if (loginStatus === '401') {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Incorrect password' }));
    } else {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: loginStatus }));
    }
}

async function patchReport(parameters, res) {
    const { reportId, response } = parameters;
    const result = await resolveReport(reportId, response);
    if (result === '200') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Report closed' }));
    } else {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: result }));
    }
}

async function getAppData(res) {
    const appData = fetchAppProperties();
    if (appData.lastStoredYear && appData.lastStoredMonth && appData.monthsToGoBack) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(appData));
    } else {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Error fetching app data' }));
    }
}

function buildDates(oldAppProperties, newAppProperties) {
    const oldEndDate = new Date(Number(oldAppProperties.lastStoredYear), Number(oldAppProperties.lastStoredMonth));
    const oldStartDate = new Date(oldEndDate);
    oldStartDate.setMonth(oldEndDate.getMonth() - oldAppProperties.monthsToGoBack + 1);
    const newEndDate = new Date(Number(newAppProperties.year), Number(newAppProperties.month));
    const newStartDate = new Date(newEndDate);
    newStartDate.setMonth(newEndDate.getMonth() - newAppProperties.monthsCount + 1);
    return { oldStartDate, oldEndDate, newStartDate, newEndDate };
}

function updateIsRelevant(dates) {
    const gapBehind = (dates.oldStartDate.getFullYear() - dates.newEndDate.getFullYear()) * 12 + dates.oldStartDate.getMonth() - dates.newEndDate.getMonth();
    const gapAhead = (dates.newStartDate.getFullYear() - dates.oldEndDate.getFullYear()) * 12 + dates.newStartDate.getMonth() - dates.oldEndDate.getMonth();
    if (gapBehind > 1 || gapAhead > 1) {
        return 'Eroare: Nu se permit goluri în datele aplicației (datele cerute sunt mai vechi & necontinue cu cele deja existente).'
    }
    if (dates.oldStartDate <= dates.newStartDate && dates.newEndDate <= dates.oldEndDate) {
        return 'Eroare: Datele cerute sunt deja existente în aplicație.';
    }
    return 'Yes';
}

function updateAppProperties(dates) {
    console.log(dates);
    const finalEndDate = (dates.newEndDate > dates.oldEndDate ? new Date(dates.newEndDate) : new Date(dates.oldEndDate));
    const finalStartDate = (dates.newStartDate < dates.oldStartDate ? new Date(dates.newStartDate) : new Date(dates.oldStartDate));
    console.log(finalStartDate, finalEndDate);
    const finalMonthsCount = (finalEndDate.getFullYear() - finalStartDate.getFullYear()) * 12
        + finalEndDate.getMonth() - finalStartDate.getMonth() + 1;
    const finalYear = finalEndDate.getFullYear();
    const finalMonth = finalEndDate.getMonth();
    console.log(finalYear, finalMonth, finalMonthsCount);
    const newAppProperties = `lastStoredYear=${finalYear}\nlastStoredMonth=${finalMonth.toString().padStart(2,'0')}\nmonthsToGoBack=${finalMonthsCount}`;
    try {
        fs.writeFileSync('app.properties', newAppProperties, 'utf8');
        return 'Succes';
    } catch (error) {
        return `Eroare: Baza de date a fost actualizată, dar nu s-au putut actualiza proprietățile aplicației: ${error}`
    }
}

async function patchDatabase(parameters, res) {
    const oldAppProperties = fetchAppProperties();
    const newAppProperties = parameters;
    const dates = buildDates(oldAppProperties, newAppProperties);
    const updateRelevancy = updateIsRelevant(dates);
    if (updateRelevancy !== 'Yes') {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: updateRelevancy}));
        return;
    }
    const downloadResult = await downloadDatasets(newAppProperties);
    if (downloadResult.includes('Eroare')) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: downloadResult }));
        return;
    }
    const updateResult = await updateDatabaseFromDatasets(newAppProperties);
    if (updateResult.includes('Eroare')) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: updateResult }));
        return;
    }
    const updateEffect = updateAppProperties(dates);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: updateEffect }));
}

export async function handleAPICall(requestPath, methodType, adminToken, parameters, res) {
    const unparameterizedPath = requestPath.split('?')[0];
    if (unparameterizedPath === '/api/unemployment-data' && methodType === 'GET') {
        await getUnemploymentData(parameters, res);
    } else if (unparameterizedPath === '/api/report' && methodType === 'POST') {
        await postReport(parameters, res);
    } else if (unparameterizedPath.startsWith('/api/login') && methodType === 'GET') {
        await loginAdmin(parameters, res);
    } else if (unparameterizedPath === '/api/open-reports' && methodType === 'GET') {
        if (!tokenIsValid(adminToken)) {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Nu sunteți un admin autorizat sau v-a expirat token-ul.' }));
            return;
        }
        await getOpenReports(res);
    } else if (unparameterizedPath === '/api/close-report' && methodType === 'PATCH') {
        if (!tokenIsValid(adminToken)) {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Nu sunteți un admin autorizat sau v-a expirat token-ul.' }));
            return;
        }
        await patchReport(parameters, res);
    } else if (unparameterizedPath === '/api/app-data' && methodType === 'GET') {
        await getAppData(res);
    } else if (unparameterizedPath === '/api/update-app' && methodType === 'PATCH') {
        if (!tokenIsValid(adminToken)) {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Nu sunteți un admin autorizat sau v-a expirat token-ul.' }));
            return;
        }
        await patchDatabase(parameters, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Nu am putut găsi API-ul cerut.' }));
    }
}