const dynamicRadio = document.getElementById('dynamic');
const staticRadio = document.getElementById('static');
const staticFields = document.querySelectorAll('.static-config');

dynamicRadio.addEventListener('change', () => {
    staticFields.forEach(field => {
        field.style.display = 'none';
    });
});

staticRadio.addEventListener('change', () => {
    staticFields.forEach(field => {
        field.style.display = 'block';
    });
});

function saveNetworkConfig() {
    const ssidInput = document.getElementById('ssid');
    const passwordInput = document.getElementById('password');
    const ipConfig = document.querySelector('input[name="ipConfig"]:checked');

    let staticIp, gateway;
    const invalidInputs = [];

    if (ipConfig.value === "static") {
        staticIp = [
            document.getElementById('staticIp1').value,
            document.getElementById('staticIp2').value,
            document.getElementById('staticIp3').value,
            document.getElementById('staticIp4').value
        ];
        gateway = [
            document.getElementById('gateway1').value,
            document.getElementById('gateway2').value,
            document.getElementById('gateway3').value,
            document.getElementById('gateway4').value
        ];

        // Check if any of the static IP or gateway fields are empty
        if (staticIp.some(value => !value) || gateway.some(value => !value)) {
            alert('Please enter values for all static IP and gateway fields.');

            // Collect invalid static IP inputs
            staticIp.forEach((value, index) => {
                if (!value) {
                    invalidInputs.push(`staticIp${index + 1}`);
                }
            });

            // Collect invalid gateway inputs
            gateway.forEach((value, index) => {
                if (!value) {
                    invalidInputs.push(`gateway${index + 1}`);
                }
            });
        }
    }

    // Check if ssid or password is empty
    if (!ssidInput.value || !passwordInput.value) {
        alert('Please enter values for both SSID and Password.');

        // Collect invalid ssid and password inputs
        if (!ssidInput.value) {
            invalidInputs.push('ssid');
        }
        if (!passwordInput.value) {
            invalidInputs.push('password');
        }
    }

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
        ssid: ssidInput.value,
        password: passwordInput.value,
        ipConfig: ipConfig.value,
        staticIp: staticIp,
        gateway: gateway
    };

    fetch('/save-network-config', {
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


