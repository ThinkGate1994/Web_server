const sidebar = document.querySelector('.sidebar');
const menuIcon = document.getElementById('sidebar-toggle');

menuIcon.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
});

