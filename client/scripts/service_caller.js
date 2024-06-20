export async function fetchData(monthsCount, criterion, counties) {
    const parameters = new URLSearchParams({
        monthsCount,
        criterion,
        counties: counties.join(',')
    });

    const response = await fetch(`http://localhost:2048/api/unemployment-data?${parameters.toString()}`);
    console.log(response);
}