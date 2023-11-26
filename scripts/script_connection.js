const enable_user_pass = document.getElementById('enable_user_pass');
const enable_will_msg = document.getElementById('enable_will_msg');
const user_pass_field = document.querySelectorAll('.user_pass-config');
const will_msg_field = document.querySelectorAll('.will_msg-config');

// console.log(enable_user_pass);
// console.log(enable_will_msg);
// console.log(user_pass_field);
// console.log(will_msg_field);

// Event listeners
enable_user_pass.addEventListener('change', () => {
    toggleDisplay(user_pass_field, enable_user_pass.checked);
});

enable_will_msg.addEventListener('change', () => {
    toggleDisplay(will_msg_field, enable_will_msg.checked);
});

// Function to toggle display
function toggleDisplay(fields, shouldDisplay) {
    fields.forEach(field => {
        field.style.display = shouldDisplay ? 'block' : 'none';
    });
}

function saveConnectionConfig() {

    const protocol = document.getElementById('protocol');
    const host = document.getElementById('host');
    const port = document.getElementById('port');
    const client_id = document.getElementById('client_id');
    const keep_alive_time = document.getElementById('keep_alive_time');
    const enable_user_pass = document.getElementById('enable_user_pass');
    const enable_will_msg = document.getElementById('enable_will_msg');

    let host_settings, user_pass, will_msg;
    const invalidInputs = [];

    host_settings = [
        protocol.value,
        host.value,
        port.value,
        client_id.value,
        keep_alive_time.value
    ];

    if (host_settings.some(value => !value)) {
        alert("Please enter all host details fields");

        host_settings.forEach((value, index) => {
            if (!value && index == 0) {
                invalidInputs.push('protocol');
            }
            else if (!value && index == 1) {
                invalidInputs.push('host');
            }
            else if (!value && index == 2) {
                invalidInputs.push('port');
            }
            else if (!value && index == 3) {
                invalidInputs.push('client_id');
            }
            else if (!value && index == 4) {
                invalidInputs.push('keep_alive_time');
            }
        });
    }

    // console.log(host_settings);
    // console.log(enable_user_pass);
    // console.log(enable_will_msg);

    if (enable_user_pass.checked) {
        console.log('checked enable_user_pass');
        user_pass = [
            document.getElementById('username').value,
            document.getElementById('password').value
        ];
        console.log(user_pass);

        if (user_pass.some(value => !value)) {
            alert("Please enter username and password");

            user_pass.forEach((value, index) => {
                if (!value && index == 0) {
                    invalidInputs.push('username');
                }
                else if (!value && index == 1) {
                    invalidInputs.push('password');
                }
            });
        }
    }

    if (enable_will_msg.checked) {
        console.log('checked enable_will_msg');
        will_msg = [
            document.getElementById('Last-Will-topic').value,
            document.getElementById('Last-Will-message').value
        ];
        console.log(will_msg);

        if (will_msg.some(value => !value)) {
            alert("Please enter will message settings");

            will_msg.forEach((value, index) => {
                if (!value && index == 0) {
                    invalidInputs.push('Last-Will-topic');
                }
                else if (!value && index == 1) {
                    invalidInputs.push('Last-Will-message');
                }
            });
        }
    }

    // console.log(invalidInputs);

    // Remove red border from all input fields
    document.querySelectorAll('.invalid-input').forEach(input => {
        input.classList.remove('invalid-input');
    });

    // Highlight all collected invalid inputs with a red border
    invalidInputs.forEach(inputId => {
        document.getElementById(inputId).classList.add('invalid-input');
    });

    // Stop execution if there are any invalid inputs
    if (invalidInputs.length > 0) {
        return;
    }

    const data = {
        protocol: protocol.value,
        host: host.value,
        port: port.value,
        client_id: client_id.value,
        keep_alive_time: keep_alive_time.value,
        enable_user_pass: enable_user_pass.checked,
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
        enable_will_msg: enable_will_msg.checked,
        Last_Will_topic: document.getElementById('Last-Will-topic').value,
        Last_Will_Qos: document.getElementById('Last-Will-Qos').value,
        Last_Will_Retain: document.getElementById('Last-Will-Retain').checked,
        Last_Will_message: document.getElementById('Last-Will-message').value
    };

    console.log(data);

    fetch('/save-connection-config', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(responseData => {
        console.log('Server response:', responseData);
    })
    .catch(error => {
        console.error('Error:', error);
    });

}

function resetInputs() {
    const inputs = document.querySelectorAll('input[type="text"], input[type="password"], input[type="number"]');
    inputs.forEach(input => {
        input.value = '';
    });

    // Remove red border from all input fields
    document.querySelectorAll('.invalid-input').forEach(input => {
        input.classList.remove('invalid-input');
    });
}
