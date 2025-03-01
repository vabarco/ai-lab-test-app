document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent page reload

        const email = document.getElementById("email").value;
        if (validateEmail(email)) {
            console.log("Logging in with:", email);
            alert("Login successful (simulation)");
        } else {
            alert("Please enter a valid email address.");
        }
    });
});

function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function socialLogin(provider) {
    alert(`Logging in with ${provider} (simulation)`);
    console.log(`User clicked ${provider} login`);
}
