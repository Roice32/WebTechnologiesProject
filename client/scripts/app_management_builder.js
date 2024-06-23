import { fetchAppData, updateApp } from "./service_caller.js";

function getNewMonth() {
    return document.getElementById('newLastStoredMonth').value;
}

function getNewMonthsCount() {
    return document.getElementById('newMonthsCount').value;
}

async function handleAppUpdate() {
    const infoMessage = document.getElementById('appUpdateError');
    const newMonth = getNewMonth();
    const newMonthsCount = getNewMonthsCount();
    if (!newMonth || !newMonthsCount) {
        infoMessage.textContent = 'Introduceți luna și numărul de luni!';
        infoMessage.style.display = 'block';
        return;
    }
    const regex = /^(0[1-9]|1[0-2])\/\d{4}$/;
    if (!regex.test(newMonth)) {
        infoMessage.textContent = 'Introduceți o lună validă în formatul LL/YYYY!';
        infoMessage.style.display = 'block';
        return;
    }
    if (newMonthsCount < 12) {
        infoMessage.textContent = 'Numărul de luni nu poate fi mai mic decât 12!';
        infoMessage.style.display = 'block';
        return;
    }
    const [month, year] = newMonth.split('/');
    infoMessage.style.color = 'black';
    infoMessage.textContent = 'Se încearcă actualizarea cu date de pe data.gov.ro... Vă rugăm așteptați!';
    infoMessage.style.display = 'block';
    const result = await updateApp(month, year, newMonthsCount);
    if (result.status === 200) {
        infoMessage.style.color = 'green';
        infoMessage.textContent = 'Actualizare reușită!';
        await new Promise(resolve => setTimeout(resolve, 1000));
        location.reload();
    } else {
        const resultText = await result.text();
        const errorResult = JSON.parse(resultText);
        infoMessage.style.color = 'red';
        infoMessage.textContent = errorResult.error;
        infoMessage.style.display = 'block';
    }
}

export default async function buildAppManagementSection() {
    const appData = await fetchAppData();
    document.getElementById('lastStoredMonth').textContent = appData.lastStoredMonth && appData.lastStoredMonth ? 
        appData.lastStoredMonth + '/' + appData.lastStoredYear : 'Necunoscut';
    document.getElementById('monthsCount').textContent = appData.monthsToGoBack ? appData.monthsToGoBack : 'Necunoscut';
    document.getElementById('updateAppButton').addEventListener('click', handleAppUpdate);
} 