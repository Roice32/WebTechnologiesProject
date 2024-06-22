import { fetchOpenReports } from './service_caller.js';
import resolveReportHandler from './resolve_report.js';

const issueTypes = {
    0: 'Eroare tehnică',
    1: 'Date/Rezultate eronate'
};

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
    return [ await buildInfoSectionElement('Data și ora:', report.data.split('.')[0].replace('T', ' ')), 
        await buildInfoSectionElement('Email:', report.email),
        await buildInfoSectionElement('Tipul problemei:', issueTypes[Number(report.tip)]),
        await buildInfoSectionElement('Descriere:', report.descriere)
    ];
}

async function buildInteractionSection(report) {
    const textArea = document.createElement('textarea');
    textArea.placeholder = 'Răspunsul dvs. la problema semnalată';
    textArea.id = 'textArea#' + report.id;

    const resolve = document.createElement('button');
    resolve.textContent = 'Închide';
    resolve.classList.add('actionButton');
    resolve.id = 'button#' + report.id;
    resolve.addEventListener('click', async () => {
        resolveReportHandler(resolve.id);
    });

    const interactionDiv = document.createElement('div');
    interactionDiv.classList.add('interactionDiv');
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

export default buildOpenReportsList;