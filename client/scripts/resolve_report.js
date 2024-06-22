import { resolveReport } from './service_caller.js';

async function resolveReportHandler(buttonId) {
    const reportId = buttonId.split('#')[1];
    const response = document.getElementById('textArea#' + reportId).value;
    if (response === '') {
        document.getElementById('h2#' + reportId).textContent = 'Introduceți un răspuns';
        document.getElementById('h2#' + reportId).style.display = 'block';
        return;
    }
    const result = await resolveReport(reportId, response);
    if (result === 200) {
        document.getElementById(buttonId).parentElement.parentElement.remove();
    } else {
        document.getElementById('h2#' + reportId).textContent = 'A apărut o eroare. Vă rugăm să încercați din nou.';
        document.getElementById('h2#' + reportId).style.display = 'block';
    }
}

export default resolveReportHandler;