// Contact form validation
var form = document.getElementById("contactForm");
var success = document.getElementById("formSuccess");

function showError(id, message) {
  document.getElementById(id + "Error").textContent = message;
  var field = document.getElementById(id);
  if (message) { field.classList.add("invalid"); } else { field.classList.remove("invalid"); }
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isDigitsOnly(value) {
  return /^[0-9]+$/.test(value);
}

function validateForm() {
  var name = document.getElementById("name").value.trim();
  var email = document.getElementById("email").value.trim();
  var phone = document.getElementById("phone").value.trim();
  var message = document.getElementById("message").value.trim();
  var valid = true;

  if (name === "") { showError("name", "Enter your name."); valid = false; }
  else { showError("name", ""); }

  if (email === "") { showError("email", "Enter your email address."); valid = false; }
  else if (!isValidEmail(email)) { showError("email", "Enter a valid email, like name@example.com."); valid = false; }
  else { showError("email", ""); }

  if (phone === "") { showError("phone", "Enter your phone number."); valid = false; }
  else if (!isDigitsOnly(phone)) { showError("phone", "Use digits only. No spaces, plus signs or dashes."); valid = false; }
  else { showError("phone", ""); }

  if (message === "") { showError("message", "Write a message."); valid = false; }
  else { showError("message", ""); }

  return valid;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  success.textContent = "";
  if (validateForm()) {
    success.textContent = "Thank you. Your message has been sent.";
    form.reset();
  }
});
