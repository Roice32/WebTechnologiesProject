import { fetchData } from "./service_caller.js";
import { generateBarChart } from "./bar_chart.js";
import { generateLineChart } from "./line_chart.js";
import { generatePieChart } from "./pie_chart.js";
import { exportAsCsv, exportAsSvg, exportAsPdf } from "./export_chart.js";

function getSelectedMonthsCount() {
    return parseInt(document.getElementById('timePeriod').value);
}

function getSelectedCriterion() {
    const selectedCriterion = document.querySelector('input[name="criterion"]:checked');
    return selectedCriterion ? selectedCriterion.value : null;
}

function getSelectedCounties() {
    const selectedAll = document.getElementById('all');
    if (selectedAll.checked) {
        return [];
    }
    const selectedCounties = document.querySelectorAll('input[name="county"]:checked');
    return Array.from(selectedCounties).map(county => county.value);
}

function extractLabelAndData(response) {
    const labels = [];
    const data = [];
    for(const [county, values] of response) {
        for(const column in values) {
            if (column !== 'total') {
                if (!labels.includes(column)) {
                    labels.push(column);
                    data.push(0);
                }
            }
        }
    }
    for(const [county, values] of response) {
        for(const column in values) {
            data[labels.indexOf(column)] += values[column];
        }
    }
    return { labels, data };
}

let currentChart = null;
let counties = [];
document.getElementById('applyButton').addEventListener('click', async () => {
    const monthsCount = getSelectedMonthsCount();
    const criterion = getSelectedCriterion();
    counties = getSelectedCounties();

    const selectedType = document.querySelector('input[name="visualizationType"]:checked').value;

    if (monthsCount && criterion) {
        try {
            const response = await fetchData(monthsCount, criterion, counties);
            console.log(response);
            const { labels, data } = extractLabelAndData(response);
            const canvas = document.getElementById('chartCanvas').getContext('2d');
            if (currentChart !== null) {
                currentChart.destroy();
            }

            switch (selectedType) {
                case 'pie':
                    currentChart = generatePieChart(canvas, labels, data);
                    break;
                case 'bar':
                    currentChart = generateBarChart(canvas, labels, data);
                    break;
                case 'graph':
                    currentChart = generateLineChart(canvas, labels, data);
                    break;
                default:
                    console.error('Unknown chart type selected');
            }
        } catch (error) {
            alert(error);
        }
    } else {
        alert('Months count and criterion are required');
    }
});

document.getElementById("downloadButton").addEventListener("click", function() {
    const selectedFormat = document.querySelector('input[name="fileFormat"]:checked').value;
    if (currentChart !== null) {
        switch (selectedFormat) {
            case 'csv':
                exportAsCsv(currentChart, counties);
                break;
            case 'svg':
                exportAsSvg(currentChart);
                break;
            case 'pdf':
                exportAsPdf(currentChart, counties);
                break;
            default:
                alert('Select a file format to export!');
        }
    } else {
        alert('No chart to export!');
    }
});