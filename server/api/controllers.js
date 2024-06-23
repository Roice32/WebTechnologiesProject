import fs from 'fs';
import fetchData from '../services/data_fetcher.js';
import sendReport from '../services/post_report.js';
import login from '../services/login.js';
import fetchOpenReports from '../services/get_open_reports.js';
import resolveReport from '../services/resolve_report.js';
import { fetchAppProperties } from '../shared.js';
import downloadDatasets from '../services/dataset_downloader.js';
import updateDatabaseFromDatasets from '../services/database_updater.js';

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
    res.end(JSON.stringify({ message: 'Report sent' }));
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
    if (loginStatus === '404') {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Admin not found' }));
    } else if (loginStatus === '401') {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Incorrect password' }));
    } else if (loginStatus === '200') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Login successful' }));
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

function calculateNewAppProperties(month, year, monthsCount) {
    const { lastStoredYear, lastStoredMonth, monthsToGoBack } = fetchAppProperties();
    const oldEndDate = new Date(Number(lastStoredYear), Number(lastStoredMonth));
    const oldStartDate = new oldEndDate.setMonth(oldEndDate.getMonth() - monthsToGoBack + 1);
    const newEndDate = new Date(Number(year), Number(month));
    const newStartDate = newEndDate.setMonth(newEndDate.getMonth() - monthsCount + 1);

    if (newEndDate < oldStartDate) {
        return 'Eroare: Nu se permit goluri în datele aplicației (datele cerute sunt mai vechi & necontinue cu cele deja existente).'
    }
    if (oldStartDate <= newStartDate && newEndDate <= oldEndDate) {
        return 'Eroare: Datele cerute sunt deja existente în aplicație.';
    }
    const finalEndDate = newEndDate > oldEndDate ? newEndDate : oldEndDate;
    const finalStartDate = newStartDate < oldStartDate ? newStartDate : oldStartDate;
    const finalMonthsCount = (finalEndDate.getFullYear() - finalStartDate.getFullYear()) * 12
        + finalEndDate.getMonth() - finalStartDate.getMonth() + 1;
    const finalYear = finalEndDate.getFullYear();
    const finalMonth = finalEndDate.getMonth();

    const newAppProperties = `lastStoredYear=${finalYear}\nlastStoredMonth=${finalMonth.toString().padStart(2,'0')}\nmonthsToGoBack=${finalMonthsCount}`;
    try {
        fs.writeFileSync('../app_properties.txt', newAppProperties, 'utf8');
        return 'Succes';
    } catch (error) {
        return `Eroare: Baza de date a fost actualizată, dar nu s-au putut actualiza proprietățile aplicației: ${error}`
    }
}

// De testat când revine site-ul guvernului
async function patchDatabase(parameters, res) {
    const { month, year, monthsCount } = parameters;
    const downloadResult = await downloadDatasets(month, year, monthsCount);
    if (downloadResult.includes('Eroare')) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: downloadResult }));
        return;
    }
    /*const updateResult = await updateDatabaseFromDatasets();
    if (updateResult.includes('Eroare')) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: updateResult }));
    }
    const updateEffect = calculateNewAppProperties(month, year, monthsCount);*/
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: '2' }));
}

export async function handleAPICall(requestPath, methodType, parameters, res) {
    const unparameterizedPath = requestPath.split('?')[0];
    if (unparameterizedPath === '/api/unemployment-data' && methodType === 'GET') {
        await getUnemploymentData(parameters, res);
    } else if (unparameterizedPath === '/api/report' && methodType === 'POST') {
        await postReport(parameters, res);
    } else if (unparameterizedPath.startsWith('/api/login') && methodType === 'GET') {
        await loginAdmin(parameters, res);
    } else if (unparameterizedPath === '/api/open-reports' && methodType === 'GET') {
        await getOpenReports(res);
    } else if (unparameterizedPath === '/api/close-report' && methodType === 'PATCH') {
        await patchReport(parameters, res);
    } else if (unparameterizedPath === '/api/app-data' && methodType === 'GET') {
        await getAppData(res);
    } else if (unparameterizedPath === '/api/update-app' && methodType === 'PATCH') {
        await patchDatabase(parameters, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'API endpoint not found' }));
    }
}