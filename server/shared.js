import fs from 'fs';

export function fetchAppProperties() {
    const appProperties = fs.readFileSync('../../app.properties', 'utf8');
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