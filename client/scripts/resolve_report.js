import { resolveReport } from './service_caller.js';

async function resolveReportHandler(buttonId) {
    const reportId = buttonId.split('#')[1];
    const response = document.getElementById('textArea#' + reportId).value;
    if (response === '') {
        alert('Please enter a response');
        return;
    }
    const result = await resolveReport(reportId, response);
    if (result === 200) {
        alert('Report closed successfully');
        document.getElementById(buttonId).parentElement.parentElement.remove();
    } else {
        alert('Error');
    }
}

export default resolveReportHandler;