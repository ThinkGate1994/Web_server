// sidebar collapsed option enable and disable
const sidebar = document.querySelector('.sidebar');
const menuIcon = document.getElementById('sidebar-toggle');

menuIcon.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
});

const iframes = document.querySelectorAll('iframe'); // Select all iframes
const tabs = document.querySelectorAll('.tab'); // Select all tabs

// Function to initialize the tab selection
function initializeTabs() {
    iframes.forEach((iframe, index) => {
        if (index === 0) {
            iframe.style.display = 'block';
        } else {
            iframe.style.display = 'none';
        }
    });

    // Add the selected-tab class to the first tab by default
    tabs[0].classList.add('selected-tab');
}

// Call the initialization function when the page loads
initializeTabs();

// Function to switch tabs
function switchTab(selectedTab) {
    const selectedIndex = parseInt(selectedTab.getAttribute('data-tab-index'));
    
    iframes.forEach((iframe, index) => {
        if (index === selectedIndex) {
            iframe.style.display = 'block';
        } else {
            iframe.style.display = 'none';
        }
    });

    // Add the selected-tab class to the current tab
    tabs.forEach(tab => tab.classList.remove('selected-tab'));
    selectedTab.classList.add('selected-tab');
}

// Add click event listeners to all tabs
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        switchTab(tab);
    });
});


