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
    if (email && type !== -1 && description) {
        if (!validEmail(email)) {
            document.getElementById('reportError').textContent = 'Email invalid';
            document.getElementById('reportError').style.display = 'block';
            return;
        }
        try {
            const response = await sendReport(email, type, description);
            document.getElementById('error').style.display = 'none';
        } catch (error) {
            document.getElementById('reportError').textContent = 'A apărut o eroare. Vă rugăm să încercați din nou.';
            document.getElementById('reportError').style.display = 'block';
        }
    } else {
        document.getElementById('reportError').textContent = 'Toate câmpurile sunt obligatorii';
        document.getElementById('reportError').style.display = 'block';
    }
});