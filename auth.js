<!-- 2916121 -->
document.addEventListener("DOMContentLoaded", () => {
    updateAuthUI();
});
function updateAuthUI() {
    const user = localStorage.getItem("currentUser");
    const accountLink = document.getElementById("account-link");
    if (!accountLink) return;
    if (user) {
        const users = JSON.parse(localStorage.getItem("users")) || {};
        const fullname = users[user]?.fullname || "Member";
        accountLink.textContent = "Logout";
        accountLink.href = "#";
        accountLink.onclick = (e) =>{
            e.preventDefault();
            logout();
        };
    } else {
        accountLink.textContent = "Login";
        accountLink.href = "loginpage.html";
        accountLink.onclick = null;
    }
}
function logout() {
    localStorage.removeItem("currentUser");
    alert("You have been logged out.");
    window.location.href = "index.html";
}

document.getElementById("loginForm")?.addEventListener("submit", function(e) {
    e.preventDefault();
    const emailInput= document.getElementById("email");
    const passwordInput= document.getElementById("password");
    const errorMessage= document.getElementById("error-message");

    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value  ;

    if(errorMessage)errorMessage.textContent = "";

    if(!email || !password){
        showError("Please enter a valid email and password");
        return;
    }
    const users = JSON.parse(localStorage.getItem("users"));
    if(!users[email]){
        showError("No user found. Please register ");
    }
    localStorage.setItem("currentUser",email);
    alert("Welcome Back To TIMELESS");
    window.location.href= "index.html";
});

document.getElementById("signupForm")?.addEventListener("submit", function(e) {
    e.preventDefault();
    const fullnameInput= document.getElementById("fullname");
    const emailInput= document.getElementById("email");
    const passwordInput= document.getElementById("password");
    const confirmInput = document.getElementById("confirm-password");
    const errorMessage = document.getElementById("error-message");

    const fullname = fullnameInput.value.trim();
    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value;
    const confirmPassword  = confirmInput.value  ;

    if (errorMessage)errorMessage.textContent = "";
    if (!fullname || !email || !password){
        showError("All fields are required ");
        return;
    }
    if (password !== confirmPassword) {
        showError ("Passwords do not match.");
        return;
    }
    if (password.length < 6) {
        showError("Passwords should be atleast 6 characters long .");
        return;
    }
    const users = JSON.parse(localStorage.getItem("users"))||{};
    if (users[email]){
        showError("Account with this email already exists . Please login ");
        return;
    }

    users[email]={
        fullname:fullname,
        email:email,
        password:password
    };
    localStorage.setItem("users",JSON.stringify(users));

    alert("Account created successfully! You can now log in.");
    window.location.href = "loginpage.html"; // Redirect to login
});
function showError(message) {
    const errorElement = document.getElementById("error-message");
    if (errorElement) {
        errorElement.textContent = message;
    }
    console.log("Auth Error:", message);
}