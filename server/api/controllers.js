import fetchData from '../services/data_fetcher.js';

async function getUnemploymentData(parameters, res) {
    try {
        const { monthsCount, criterion, counties } = parameters;
        const data = await fetchData(monthsCount, criterion, counties);
        console.log(data);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data));
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: error.message }));
    }
}

export async function handleAPICall(requestPath, methodType, parameters, res) {
    const unparameterizedPath = requestPath.split('?')[0];
    if (unparameterizedPath === '/api/unemployment-data' && methodType === 'GET') {
        await getUnemploymentData(parameters, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'API endpoint not found' }));
    }
}