document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const messageError = document.getElementById("messageError");
  const successMessage = document.getElementById("successMessage");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    // Reset errors
    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";
    successMessage.classList.add("hidden");
    let isValid = true;
    if (!nameInput.value.trim()) {
      nameError.textContent = "Please enter your name.";
      isValid = false;
    }
    if (!emailInput.value.trim()) {
      emailError.textContent = "Email is required.";
      isValid = false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
      emailError.textContent = "Please enter a valid email address.";
      isValid = false;
    }
    if (!messageInput.value.trim()) {
      messageError.textContent = "Please write a message.";
      isValid = false;
    }
    if (isValid) {
      // Simulate successful submission
      console.log("Message sent:", {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        message: messageInput.value.trim(),
      });
      form.reset();
      successMessage.classList.remove("hidden");
    }
  });
});