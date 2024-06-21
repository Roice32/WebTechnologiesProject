import { fetchData } from "./service_caller.js";
import { generateBarChart } from "./bar_chart.js";
import { generateLineChart } from "./line_chart.js";
import { generatePieChart } from "./pie_chart.js";

function getSelectedMonthsCount() {
    const sliderValue = parseInt(document.getElementById('timePeriod').value);
    return 3 + Math.floor(sliderValue / 30) * 3;
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
    labels.push('January');
    labels.push('February');
    data.push(10);
    data.push(20);
    return { labels, data };
}

let currentChart = null;
document.getElementById('applyButton').addEventListener('click', async () => {
    const monthsCount = getSelectedMonthsCount();
    const criterion = getSelectedCriterion();
    const counties = getSelectedCounties();

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