document.getElementById('logoutButton').addEventListener('click', async () => {
    localStorage.removeItem('adminToken');
    location.reload();
});