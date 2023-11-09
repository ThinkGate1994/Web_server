function addRow() {
    const table = document.querySelector('#modbusTable table tbody');
    if (table.rows.length >= 30) {
        alert("You've reached the maximum limit of rows (30).");
        return;
    }
    const newRow = table.insertRow(table.rows.length);
    const cells = Array.from({ length: 7 }, () => newRow.insertCell());
    cells.forEach((cell, index) => {
        if (index === 6) {
            cell.innerHTML = '<button class="clear-button" onclick="clearRow(this)">Clear</button> <button class="delete-button" onclick="deleteRow(this)">Delete</button>';
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
            input.addEventListener('input', validateNumberInput);
            input.type = 'text';
            cell.appendChild(input);
        }
    });
}

function validateNumberInput(event) {
    const input = event.target;
    const value = input.value;

    // Use a regular expression to check if the input is a number (integer or decimal)
    if (!/^\d*\.?\d*$/.test(value)) {
        // If the input is not a number, remove any non-digit and non-decimal characters
        input.value = value.replace(/[^\d.]/g, '');
    }
}

function deleteRow(button) {
    const row = button.closest('tr');

    // Check if the row is not the first row before deleting
    if (row !== row.parentNode.querySelector('tr')) {
        row.parentNode.removeChild(row);
    }
}

function clearRow(button) {
    const row = button.closest('tr');
    const inputs = row.querySelectorAll('input');
    inputs.forEach((input) => {
        input.value = ''; // Clear the input fields
    });
}

// Add event listeners and validation for the input fields in the initial row
document.addEventListener('DOMContentLoaded', function () {
    const initialRow = document.querySelector('#modbusTable tbody tr');
    const inputs = initialRow.querySelectorAll('input');
    inputs.forEach((input) => {
        input.addEventListener('input', validateNumberInput);
    });
});
