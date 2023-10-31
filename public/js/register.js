const form = document.getElementById("frm");
const emailField = document.getElementById("email");
const passwordField = document.getElementById("password");
const confirmPasswordField = document.getElementById("confirmPassword");


String.prototype.isEmail = function () {
    return !!this.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
};
form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!emailField.value.trim().isEmail()) {
        emailField.parentElement.classList.add("errorInput");
        return;
    } else {
        emailField.parentElement.classList.remove("errorInput");
    }
    if (passwordField.value.trim() != confirmPasswordField.value.trim()) {
        console.log("Error in Password");
        passwordField.parentElement.classList.add("errorInput");
        confirmPasswordField.parentElement.classList.add("errorInput");
    } else {
        passwordField.parentElement.classList.remove("errorInput");
        confirmPasswordField.parentElement.classList.remove("errorInput");
        form.submit();
    }

})