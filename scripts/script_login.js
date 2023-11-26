function check_credentials() {
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const error_msg = document.getElementById('error-message');

    const data = {
        username: username.value,
        password: password.value
    }
    console.log(data);

    fetch('/login', {
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

            // Check the status in the response
            if (responseData.status === 'success') {
                // Redirect to /dashboard
                window.location.href = '/dashboard';
            }
            else if (responseData.status === 'fail') {
                // Handle other cases if needed
                console.log('Login failed.');

                error_msg.textContent = "Wrong username or password";
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
