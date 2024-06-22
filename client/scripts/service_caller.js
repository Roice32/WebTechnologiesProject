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