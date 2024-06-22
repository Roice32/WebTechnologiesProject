import { fetchData } from "./service_caller.js";

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

document.getElementById('applyButton').addEventListener('click', async () => {
    const monthsCount = getSelectedMonthsCount();
    const criterion = getSelectedCriterion();
    const counties = getSelectedCounties();
    if (monthsCount && criterion) {
        try {
            const response = await fetchData(monthsCount, criterion, counties);
            // Foloseste response pentru a face diagramele
        } catch (error) {
            alert(error);
        }
    } else {
        alert('Months count and criterion are required');
    }
});