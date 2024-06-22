import { fetchOpenReports } from './service_caller.js';

const issueTypes = {
    0: 'Eroare tehnică',
    1: 'Date/Rezultate eronate'
};

async function showLogin() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('loginError').style.display = 'none';
    document.getElementById('adminPanel').style.display = 'none';
}

async function buildOpenReportsList() {
    const openReports = await fetchOpenReports();
    console.log(openReports);
    const reportsList = document.getElementById('openReportsSection');
    for (const report of openReports) {
        const reportElement = document.createElement('li');
        reportElement.textContent = `${report.email} - ${issueTypes[Number(report.tip)]} - ${report.descriere}`;
        reportElement.classList.add('openReport');
        reportsList.appendChild(reportElement);
    }
}

async function showAdminPanel() {
    await buildOpenReportsList();
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('adminPanel').style.display = 'block';
}

async function displayAdminPage() {
    if (localStorage.getItem('admin')) {
        await showAdminPanel();
    } else {
        await showLogin();
    }
}

document.addEventListener('DOMContentLoaded', displayAdminPage);