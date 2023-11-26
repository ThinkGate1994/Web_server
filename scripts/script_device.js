function addRow() {
    const table = document.querySelector('#modbusTable table tbody');
    // console.log(table);

    if (table.rows.length >= 30) {
        alert("You've reached the maximum limit of rows (30).");
        return;
    }

    const newRow = table.insertRow(table.rows.length);
    const cells = Array.from({ length: 8 }, () => newRow.insertCell());

    // console.log(newRow);
    // console.log(cells);

    cells.forEach((cell, index) => {
        if (index === 7) {
            cell.innerHTML = '<button class="clear-button" onclick="clearRow(this)">Clear</button> <button class="delete-button" onclick="deleteRow(this)">Delete</button>';
        }
        else if (index === 2) {
            const selectFunctionCode = document.createElement('select');
            selectFunctionCode.className = 'function-code-dropdown';
            selectFunctionCode.innerHTML = `
                <option value="3">3</option>
                <option value="4">4</option>
            `;
            cell.appendChild(selectFunctionCode);
        }
        else if (index === 4) {
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
        }
        else if (index == 0) {
            const input = document.createElement('input');
            // input.addEventListener('input', validateNumberInput);
            input.type = 'text';
            cell.appendChild(input);
        }
        else {
            const input = document.createElement('input');
            // input.addEventListener('input', validateNumberInput);
            input.type = 'number';
            cell.appendChild(input);
        }
    });
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

function saveNetworkConfig() {
    // Fetch device configuration data
    const temperatureSensor = document.querySelector('#check_temp').checked;
    const humiditySensor = document.querySelector('#check_humi').checked;
    const modbusEnabled = document.querySelector('#enableModbus').checked;

    // Fetch modbus configuration data
    const baudrate = document.querySelector('.baudrate-dropdown').value;
    const databits = document.querySelector('.databits-dropdown').value;
    const parity = document.querySelector('.parity-dropdown').value;
    const stopbit = document.querySelector('.stopbit-dropdown').value;

    // Fetch table data
    const table = document.querySelector('#modbusTable table tbody');
    const rows = table.querySelectorAll('tr');
    const columnData = Array.from({ length: 7 }, () => []);

    rows.forEach((row) => {
        const inputs = row.querySelectorAll('input, select');

        inputs.forEach((input, index) => {
            // Use the input's id or name, or fallback to the index
            // const columnName = input.id || input.name || index.toString();
            columnData[index].push(input.value);
        });
    });

    // Combine all data into a single object
    const allData = {
        deviceConfig: {
            temperatureSensor,
            humiditySensor,
            modbusEnabled,
        },
        modbusConfig: {
            baudrate,
            databits,
            parity,
            stopbit,
        },
        columnData: columnData,
    };

    // Convert the JavaScript object to a JSON string
    const jsonString = JSON.stringify(allData);

    // Fetch the content length
    const contentLength = jsonString.length;

    console.log(contentLength);
    console.log(jsonString);

    // Send the 'allData' object to the ESP web server
    fetch('save-device-config', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': contentLength.toString(), // Set the Content-Length header
        },
        body: jsonString,
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        // Handle success
    })
    .catch((error) => {
        console.error('Error:', error);
        // Handle error
    });
}




