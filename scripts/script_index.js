// sidebar collapsed option enable and disable
const sidebar = document.querySelector('.sidebar');
const menuIcon = document.getElementById('sidebar-toggle');

menuIcon.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
});

// identify selected tab and show content of related tab
const tab1Iframe = document.getElementById('tab1');
const tab2Iframe = document.getElementById('tab2');
const networkTab = document.querySelector('.tab:nth-child(2)');
const deviceTab = document.querySelector('.tab:nth-child(3)');

// Initially, hide the tab2 iframe
tab2Iframe.style.display = 'none';
networkTab.classList.add('selected-tab');

networkTab.addEventListener('click', () => {
    tab1Iframe.style.display = 'block';
    tab2Iframe.style.display = 'none';

    // Add the selected-tab class to the current tab
    networkTab.classList.add('selected-tab');

    // Remove the selected-tab class from the other tab
    deviceTab.classList.remove('selected-tab');
});

deviceTab.addEventListener('click', () => {
    tab1Iframe.style.display = 'none';
    tab2Iframe.style.display = 'block';

    // Add the selected-tab class to the current tab
    deviceTab.classList.add('selected-tab');

    // Remove the selected-tab class from the other tab
    networkTab.classList.remove('selected-tab');
});

