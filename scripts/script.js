const sidebar = document.querySelector('.sidebar');
const toggleButton = document.getElementById('sidebar-toggle');

toggleButton.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
});

function checkScreenWidth() {
    if (window.innerWidth <= 768) {
        sidebar.classList.add('collapsed');
    } else {
        sidebar.classList.remove('collapsed');
    }
}

window.addEventListener('resize', checkScreenWidth);
checkScreenWidth();

window.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('tab1').style.display = 'block';
});

const passwordInput = document.getElementById('passwordInput');
const togglePasswordButton = document.getElementById('togglePassword-button');

togglePasswordButton.addEventListener('click', function () {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        togglePasswordButton.textContent = 'Hide Password';
    } else {
        passwordInput.type = 'password';
        togglePasswordButton.textContent = 'Show Password';
    }
});

function openTab(tabId) {
    const tabs = document.querySelectorAll('.main > div');
    tabs.forEach(tab => tab.style.display = 'none');

    const tabToShow = document.getElementById(tabId);
    tabToShow.style.display = 'block';

    if (tabId === 'tab2') {
        const enableModbusCheckbox = document.getElementById('enableModbus');
        const modbusTable = document.getElementById('modbusTable');

        // Add an event listener to the checkbox to toggle the Modbus table's visibility
        enableModbusCheckbox.addEventListener('change', function () {
            modbusTable.style.display = this.checked ? 'block' : 'none';
        });

        // Ensure the initial state of the Modbus table
        modbusTable.style.display = enableModbusCheckbox.checked ? 'block' : 'none';
    }
}

function addRow() {
    const table = document.querySelector('#modbusTable table tbody');
    const newRow = table.insertRow(table.rows.length);
    const cells = Array.from({ length: 7 }, () => newRow.insertCell());
    cells.forEach((cell, index) => {
        if (index === 6) {
            cell.innerHTML = '<button class="delete-button" onclick="deleteRow(this)">Delete</button>';
        } else if (index === 1) {
            const selectFunctionCode = document.createElement('select');
            selectFunctionCode.className = 'function-code-dropdown';
            selectFunctionCode.innerHTML = `
                <option value="3">3</option>
                <option value="4">4</option>
            `;
            cell.appendChild(selectFunctionCode);
        } else if (index === 3) {
            const selectDataType = document.createElement('select');
            selectDataType.className = 'data-type-dropdown';
            selectDataType.innerHTML = `
                <option value="int8">int8</option>
                <option value="uint8">uint8</option>
                <option value="int16">int16</option>
                <option value="uint16">uint16</option>
                <option value="int32-inverse">int32 inverse (Big-endian)</option>
                <option value="uint32-inverse">uint32 inverse (Big-endian)</option>
                <option value="int32-little-endian">int32 (Little-endian byte swap)</option>
                <option value="uint32-little-endian">uint32 (Little-endian byte swap)</option>
                <option value="float-inverse">float inverse (Big-endian)</option>
                <option value="float-little-endian">float (Little-endian byte swap)</option>
                <option value="int64-inverse">int64 inverse (Big-endian)</option>
                <option value="uint64-inverse">uint64 inverse (Big-endian)</option>
                <option value="int64-little-endian">int64 (Little-endian byte swap)</option>
                <option value="uint64-little-endian">uint64 (Little-endian byte swap)</option>
                <option value="double-inverse">double inverse (Big-endian)</option>
                <option value="double-little-endian">double (Little-endian byte swap)</option>
            `;
            cell.appendChild(selectDataType);
        } else {
            const input = document.createElement('input');
            input.type = 'text';
            cell.appendChild(input);
        }
    });
}

function deleteRow(button) {
    const row = button.closest('tr');
    row.parentNode.removeChild(row);
}
