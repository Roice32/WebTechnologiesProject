let currentChart = null;

document.getElementById("applyButton").addEventListener("click", function() {
    const selectedType = document.querySelector('input[name="visualizationType"]:checked').value;

    const canvas = document.getElementById('chartCanvas').getContext('2d');

    if (currentChart !== null) {
        currentChart.destroy();
    }

    switch (selectedType) {
        case 'pie':
            currentChart = generatePieChart(canvas);
            break;
        case 'bar':
            currentChart = generateBarChart(canvas);
            break;
        case 'graph':
            currentChart = generateLineChart(canvas);
            break;
        default:
            console.error('Unknown chart type selected');
    }
});