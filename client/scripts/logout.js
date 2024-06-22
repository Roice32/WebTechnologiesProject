document.getElementById('logoutButton').addEventListener('click', async () => {
    localStorage.removeItem('admin');
    location.reload();
});