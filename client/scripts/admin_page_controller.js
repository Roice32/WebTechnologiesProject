import buildOpenReportsList from './reports_section_builder.js';

async function showLogin() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('loginError').style.display = 'none';
    document.getElementById('adminPanel').style.display = 'none';
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