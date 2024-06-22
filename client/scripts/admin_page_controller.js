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

async function buildInfoSectionElement(text, value) {
    const label = document.createElement('label');
    label.textContent = text;
    const field = document.createElement('span');
    field.textContent = value;
    
    const infoSectionElement = document.createElement('div');
    infoSectionElement.classList.add('labelValueDiv');
    infoSectionElement.appendChild(label);
    infoSectionElement.appendChild(field);
    return infoSectionElement;
}

async function buildInfoSection(report) {
    return [ await buildInfoSectionElement('Email:', report.email),
                await buildInfoSectionElement('Tipul problemei:', issueTypes[Number(report.tip)]),
                await buildInfoSectionElement('Descriere:', report.descriere)
    ];
}

async function buildInteractionSection(report) {
    const interactionDiv = document.createElement('div');
    interactionDiv.classList.add('interactionDiv');
    const textArea = document.createElement('textarea');
    textArea.placeholder = 'Răspunsul dvs. la problema semnalată';
    const resolve = document.createElement('button');
    resolve.textContent = 'Marchează ca rezolvat';
    resolve.classList.add('actionButton');
    resolve.id = report.id;
    interactionDiv.appendChild(textArea);
    interactionDiv.appendChild(resolve);
    return interactionDiv;
}

async function buildOpenReport(report) {
    const openReportElement = document.createElement('div');
    const infoSectionElements = await buildInfoSection(report);
    for (const element of infoSectionElements) {
        openReportElement.appendChild(element);
    }
    openReportElement.appendChild(await buildInteractionSection(report));
    openReportElement.classList.add('openReport');
    return openReportElement;
}

async function buildOpenReportsList() {
    const openReports = await fetchOpenReports();
    const reportsList = document.getElementById('openReportsSection');
    for (const report of openReports) {
        reportsList.appendChild(await buildOpenReport(report));
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