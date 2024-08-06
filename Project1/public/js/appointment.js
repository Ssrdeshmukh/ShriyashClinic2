document.getElementById('appointmentForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    const token = localStorage.getItem('token'); // Get the token from localStorage

    if (!token) {
        alert('You need to log in first.');
        return;
    }

    const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token // Send the token in the headers
        },
        body: JSON.stringify({ name, phone, email, message, date, time })
    });

    if (response.ok) {
        alert("Your appointment is booked successfully, May the God's hands rest upon you as you recover.");
        document.getElementById('appointmentForm').reset();
    } else {
        const error = await response.json();
        alert('Error: ' + error.msg);
    }
});