import { fetchAppData, updateApp } from "./service_caller.js";

function getNewMonth() {
    return document.getElementById('newLastStoredMonth').value;
}

function getNewMonthsCount() {
    return document.getElementById('newMonthsCount').value;
}

async function handleAppUpdate() {
    const newMonth = getNewMonth();
    const newMonthsCount = getNewMonthsCount();
    if (!newMonth || !newMonthsCount) {
        document.getElementById('appUpdateError').textContent = 'Introduceți luna și numărul de luni!';
        document.getElementById('appUpdateError').style.display = 'block';
        return;
    }
    const regex = /^(0[1-9]|1[0-2])\/\d{4}$/;
    if (!regex.test(newMonth)) {
        document.getElementById('appUpdateError').textContent = 'Introduceți o lună validă în formatul LL/YYYY!';
        document.getElementById('appUpdateError').style.display = 'block';
        return;
    }
    if (newMonthsCount < 12) {
        document.getElementById('appUpdateError').textContent = 'Numărul de luni nu poate fi mai mic decât 12!';
        document.getElementById('appUpdateError').style.display = 'block';
        return;
    }
    const [month, year] = newMonth.split('/');
    const status = await updateApp(month, year, newMonthsCount);
    if (status === 'Succes') {
        location.reload();
    } else {
        document.getElementById('appUpdateError').textContent = status;
        document.getElementById('appUpdateError').style.display = 'block';
    }
}

export default async function buildAppManagementSection() {
    const appData = await fetchAppData();
    document.getElementById('lastStoredMonth').textContent = appData.lastStoredMonth && appData.lastStoredMonth ? 
        appData.lastStoredMonth + '/' + appData.lastStoredYear : 'Necunoscut';
    document.getElementById('monthsCount').textContent = appData.monthsToGoBack ? appData.monthsToGoBack : 'Necunoscut';
    document.getElementById('updateAppButton').addEventListener('click', handleAppUpdate);
} 