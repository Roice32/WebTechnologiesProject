import http from 'http';
import handleRequest from './api/request_handler.js';

const server = http.createServer(async (req, res) => {
    console.log(req.url + ' ' + req.method);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    await handleRequest(req, res);
});

const PORT = 2048;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});