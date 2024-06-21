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
            alert('Invalid email address');
            return;
        }
        try {
            const response = await sendReport(email, type, description);
            console.log(response);
        } catch (error) {
            alert(error);
        }
    } else {
        alert('Email, type and description are required');
    }
});