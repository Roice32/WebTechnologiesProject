import fetchData from '../services/data_fetcher.js';
import sendReport from '../services/post_report.js';

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

export async function handleAPICall(requestPath, methodType, parameters, res) {
    const unparameterizedPath = requestPath.split('?')[0];
    if (unparameterizedPath === '/api/unemployment-data' && methodType === 'GET') {
        await getUnemploymentData(parameters, res);
    } else if (unparameterizedPath === '/api/report' && methodType === 'POST') {
        await postReport(parameters, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'API endpoint not found' }));
    }
}