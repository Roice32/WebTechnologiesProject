import fs from 'fs';

export async function navigateTo(requestPath, res) {
    if (!fs.existsSync(`client/pages/${requestPath}`)) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Page not found' }));
        return;
    }
    try {
        const requestedPage = requestPath === '/' ? 'index.html' : requestPath.split('/').pop();
        const data = fs.readFileSync(`client/pages/${requestedPage}`);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
        return;
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: error.message }));
        return;
    }
}