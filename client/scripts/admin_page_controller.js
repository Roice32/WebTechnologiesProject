import buildOpenReportsList from './reports_section_builder.js';
import buildAppManagementSection from './app_management_builder.js';

async function showLogin() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('loginError').style.display = 'none';
    document.getElementById('logoutButton').style.display = 'none';
    document.getElementById('appManagementPanel').style.display = 'none';
    document.getElementById('openReportsPanel').style.display = 'none';
}

async function showAdminPanel() {
    await buildAppManagementSection();
    await buildOpenReportsList();
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('logoutButton').style.display = 'block';
    document.getElementById('appManagementPanel').style.display = 'block';
    document.getElementById('openReportsPanel').style.display = 'block';
}

async function displayAdminPage() {
    if (localStorage.getItem('adminToken')) {
        await showAdminPanel();
    } else {
        await showLogin();
    }
}

document.addEventListener('DOMContentLoaded', displayAdminPage);