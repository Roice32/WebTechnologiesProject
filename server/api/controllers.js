import fetchData from '../services/data_fetcher.js';
import sendReport from '../services/post_report.js';
import login from '../services/login.js';
import fetchOpenReports from '../services/get_open_reports.js';

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

export async function handleAPICall(requestPath, methodType, parameters, res) {
    const unparameterizedPath = requestPath.split('?')[0];
    if (unparameterizedPath === '/api/unemployment-data' && methodType === 'GET') {
        await getUnemploymentData(parameters, res);
    } else if (unparameterizedPath === '/api/report' && methodType === 'POST') {
        await postReport(parameters, res);
    } else if (unparameterizedPath.startsWith('/api/login') && methodType === 'GET') {
        await loginAdmin(parameters, res);
    } else if (unparameterizedPath === '/api/openReports' && methodType === 'GET') {
        await getOpenReports(res);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'API endpoint not found' }));
    }
}