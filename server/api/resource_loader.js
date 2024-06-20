import fs from 'fs';

export const resourceTypes = {
    'html': 'text/html',
    'css': 'text/css',
    'js': 'application/javascript',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'webp': 'image/webp',
    'gif': 'image/gif',
    'svg': 'image/svg+xml',
    'ico': 'image/x-icon',
}

const resourcesLocations = {
    'html': 'pages',
    'css': 'styles',
    'js': 'scripts',
    'jpg': 'images',
    'jpeg': 'images',
    'png': 'images',
    'webp': 'images',
    'gif': 'images',
    'svg': 'images',
    'ico': 'images',
}

export async function loadResource(requestPath, res) {
    if (!fs.existsSync(`client/${requestPath}`)) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Resource not found' }));
        return;
    }
    const requestedResource = requestPath.split('/').pop();
    const fileExtension = requestPath.split('.').pop();
    try {
        const data = fs.readFileSync(`client/${resourcesLocations[fileExtension]}/${requestedResource}`);
        res.writeHead(200, { 'Content-Type': resourceTypes[fileExtension] });
        res.end(data);
        return;
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: error.message }));
        return;
    }
}