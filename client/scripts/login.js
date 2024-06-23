import { attemptLogin } from './service_caller.js';

function getUsername() {
    return document.getElementById('username').value;
}

function getPassword() {
    return document.getElementById('password').value;
}

function setErrorMessage(message) {
    document.getElementById('loginError').innerText = message;
    document.getElementById('loginError').style.display = 'block';
}

function handleLoginResponse(responseBody) {
    if (responseBody.error) {
        setErrorMessage(responseBody.error);
    } else {
        localStorage.setItem('adminToken', responseBody.adminToken);
        location.reload();
    }
}

document.getElementById('loginButton').addEventListener('click', async () => {
    const username = getUsername();
    const password = getPassword();
    const response = await attemptLogin(username, password);
    handleLoginResponse(JSON.parse(response));
});