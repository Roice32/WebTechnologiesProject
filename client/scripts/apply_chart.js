document.addEventListener("DOMContentLoaded", function() {
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

document.getElementById("downloadButton").addEventListener("click", function() {
    const selectedFormat = document.querySelector('input[name="fileFormat"]:checked').value;
    if (currentChart !== null) {
        switch (selectedFormat) {
            case 'csv':
                exportAsCsv(currentChart);
                break;
            case 'svg':
                exportAsSvg(currentChart);
                break;
            case 'pdf':
                exportAsPdf(currentChart);
                break;
            default:
                alert('Select a file format to export!');
        }
    } else {
        alert('No chart to export!');
    }
});

function exportAsCsv(chart) {
    const labels = chart.data.labels;
    const data = chart.data.datasets[0].data;

    let csvContent = "data:text/csv;charset=utf-8,"
                    + labels.join(",") + "\n"
                    + data.join(",");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "chart_data.csv");
    document.body.appendChild(link);
    link.click();
}

function exportAsSvg(chart) {
    const canvas = chart.canvas;
    const svgContext = new C2S(canvas.width, canvas.height);
    chart.draw(svgContext);
    const svg = svgContext.getSerializedSvg();

    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'chart.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function exportAsPdf(chart) {
    const canvas = chart.canvas;
    const imgData = canvas.toDataURL("image/png");

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 10, 10);
    const labels = chart.data.labels;
    const data = chart.data.datasets[0].data;

    let textXPosition = 10;
    let textYPosition = 210;   
    const labelsPerLine = 4;    
    for (let i = 0; i < labels.length; i++) {
        if (i > 0 && i % labelsPerLine === 0) {
            textXPosition = 10;    
            textYPosition += 10;    
        }
        pdf.text(labels[i] + ': ' + data[i], textXPosition, textYPosition);
        textXPosition += 50;    
    }
    pdf.save("chart.pdf");
}
});