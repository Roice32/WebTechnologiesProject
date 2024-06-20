import fs from 'fs';

export function fetchAppProperties() {
    var failCount = 0;
    var appPropertiesPath = 'app.properties';
    while (!fs.existsSync(appPropertiesPath)) {
        appPropertiesPath = '../' + appPropertiesPath;
        if (++failCount > 10) {
            throw new Error('app.properties file not found');
        }
    }
    const appProperties = fs.readFileSync(appPropertiesPath, 'utf8');
    const lines = appProperties.split('\n');
    const lastStoredYear = parseInt(lines[0].split('=')[1]);
    const lastStoredMonth = parseInt(lines[1].split('=')[1]);
    const monthsToGoBack = parseInt(lines[2].split('=')[1]);

    return {
        lastStoredYear,
        lastStoredMonth,
        monthsToGoBack
    }
}

export async function getRequestBody(req) {
    return new Promise((resolve, reject) => {
        var body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            resolve(body);
        });
        req.on('error', error => {
            reject(error);
        });
    });
}