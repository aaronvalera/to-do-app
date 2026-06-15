import {displayNotification} from '/components/notification.js';

// REGEX
const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9]{4,19}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()-+]).{8,19}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// SELECTORS
const form = document.getElementById("form");
const usernameInput = document.getElementById("username-input");
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const passwordMatchInput = document.getElementById("match-password");
const submitFormBtn = document.getElementById("form-btn");
const notification = document.getElementById("notification");

// VARIABLES
let usernameValidation = false;
let passwordValidation = false;
let emailValidation = false;
let passwordMatchValidation = false;

// VALIDATION
const checkFormStatus = () => {
    const isFormValid = usernameValidation &&
                        passwordValidation &&
                        emailValidation &&
                        passwordMatchValidation;``
    submitFormBtn.disabled = !isFormValid;
    if(isFormValid) {
        submitFormBtn.classList.add("bg-blue-500");
        submitFormBtn.removeAttribute("disabled");
    }
};

const unvalidInput = (inputSelector) => {
    inputSelector.classList.remove(
        "outline-blue-400",
        "bg-sky-100",
        "bg-zinc-50"
    );
    inputSelector.classList.add("outline-red-400", "bg-red-50");
};

const validInput = (inputSelector) => {
    inputSelector.classList.remove(
        "outline-red-400",
        "bg-red-50",
        "bg-zinc-50"
    );
    inputSelector.classList.add("outline-blue-400", "bg-sky-100");
};

const clearInput = (inputSelector) => {
    inputSelector.classList.remove(
        "outline-blue-400",
        "bg-sky-100",
        "outline-red-400",
        "bg-red-50"
    );
    inputSelector.classList.add("bg-zinc-50");
};

const inputsValidation = (validator, inputSelector) => {
    if(inputSelector.value === "") {
        clearInput(inputSelector);
        checkFormStatus();
        return;
    }
    if(validator) {
        validInput(inputSelector);
    } else {
        unvalidInput(inputSelector);
    }
    checkFormStatus();
};

const validatePasswords = () => {
    passwordMatchValidation = passwordMatchInput.value !== "" && passwordInput.value === passwordMatchInput.value;
    inputsValidation(passwordMatchValidation, passwordMatchInput);
};

usernameInput.addEventListener("input", event => {
    usernameValidation = USERNAME_REGEX.test(event.target.value);
    inputsValidation(usernameValidation, usernameInput);
});

emailInput.addEventListener("input", event => {
    emailValidation = EMAIL_REGEX.test(event.target.value);
    inputsValidation(emailValidation, emailInput);
});

passwordInput.addEventListener("input", event => {
    passwordValidation = PASSWORD_REGEX.test(event.target.value);
    inputsValidation(passwordValidation, passwordInput);
    validatePasswords();
});

passwordMatchInput.addEventListener("input", event => {
    validatePasswords();
});

form.addEventListener("submit", async event => {
    event.preventDefault();
    try {
        const newUser = {
        username: usernameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
    }
    const response = await axios.post("/api/users", newUser);
    console.log(response)
    } catch (error) {
        setTimeout(() => {
            notification.innerHTML = "";
            notification.classList.remove("opacity-100", "translate-x-0");
            notification.classList.add("opacity-0", "translate-x-5", "pointer-events-none");
        }, 4000);
        displayNotification(true, error.response.data.error);
        console.log(error.response.data.error);
    }
});