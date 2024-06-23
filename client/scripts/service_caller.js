export async function fetchData(monthsCount, criterion, counties) {
    const parameters = new URLSearchParams({
        monthsCount,
        criterion,
        counties: counties.join(',')
    });
    const response = await fetch(`http://localhost:2048/api/unemployment-data?${parameters.toString()}`);
    const text = await response.text();
    const data = new Map(JSON.parse(text));
    return data;
}

export async function sendReport(email, type, description) {
    const parameters = {
        email,
        type,
        description
    };
    const response = await fetch('http://localhost:2048/api/report', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(parameters)
    });
    const text = await response.text();
    return text;
}

export async function attemptLogin(username, password) {
    const parameters = new URLSearchParams({
        username,
        password
    });
    const response = await fetch(`http://localhost:2048/api/login?${parameters.toString()}`);
    const responseBody = await response.text();
    return responseBody;
}

export async function fetchOpenReports() {
    const response = await fetch('http://localhost:2048/api/open-reports');
    const text = await response.text();
    return JSON.parse(text);
}

export async function resolveReport(reportId, response) {
    const parameters = {
        reportId,
        response
    };
    const fetchResponse = await fetch('http://localhost:2048/api/close-report', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(parameters)
    });
    return fetchResponse.status;
}

export async function fetchAppData() {
    const response = await fetch('http://localhost:2048/api/app-data');
    const text = await response.text();
    return JSON.parse(text);
}

export async function updateApp(month, year, monthsCount) {
    const parameters = {
        month,
        year,
        monthsCount
    };
    const response = await fetch('http://localhost:2048/api/update-app', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(parameters)
    });
    return response;
}