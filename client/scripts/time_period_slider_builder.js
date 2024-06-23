import { fetchAppData } from './service_caller.js';

async function buildTimePeriodSlider() {
    const { lastStoredYear, lastStoredMonth, monthsToGoBack } = await fetchAppData();
    document.getElementById('timePeriodInfo').textContent = `Luni în trecut, până la ${lastStoredMonth}/${lastStoredYear} (inclusiv).`;
    
    const slider = document.getElementById('timePeriod');
    slider.min = 1;
    slider.max = monthsToGoBack;
    slider.value = 1;

    const monthsLabels = document.getElementById('monthsLabels');
    for (var i = 1; i <= monthsToGoBack; i++) {
        const label = document.createElement('li');
        label.innerHTML = '🞁<br>' + i;
        label.style.width = 'calc(100% / ' + monthsToGoBack + ' - 1)';
        monthsLabels.appendChild(label);
    }
}

document.addEventListener('DOMContentLoaded', buildTimePeriodSlider);