import { sendReport } from "./service_caller.js";

const issueTypes = {
    '': -1,
    'technical': 0,
    'misleading': 1
};

function getEmail() {
    return document.getElementById('email').value;
}

function getProblemType() {
    const selectedType = document.getElementById('issueType').value;
    return issueTypes[selectedType];
}

function getDescription() {
    return document.getElementById('report').value;
}

function validEmail(email) {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
}

document.getElementById('submitReport').addEventListener('click', async () => {
    const email = getEmail();
    const type = getProblemType();
    const description = getDescription();
    const infoMessage = document.getElementById('reportError');
    infoMessage.style.display = 'none';
    infoMessage.style.color = 'red';
    if (email && type !== -1 && description) {
        if (!validEmail(email)) {
            infoMessage.textContent = 'Email invalid';
            infoMessage.style.display = 'block';
            return;
        }
        try {
            const response = await sendReport(email, type, description);
            infoMessage.style.color = 'green';
            infoMessage.textContent = JSON.parse(response).message;
            infoMessage.style.display = 'block';
        } catch (error) {
            infoMessage.textContent = 'A apărut o eroare. Vă rugăm să încercați din nou.';
            infoMessage.style.display = 'block';
        }
    } else {
        infoMessage.textContent = 'Toate câmpurile sunt obligatorii';
        infoMessage.style.display = 'block';
    }
});