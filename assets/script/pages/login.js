import {server} from "./../modules/serverFunction.js";

const wrapperModal = document.getElementById("wrapper-modal-first-login");
const inputUsername = document.getElementById("modal-login-input-username");
const inputPass = document.getElementById("modal-login-input-pass");
const inputPassAgain = document.getElementById("modal-login-input-pass-again");
const messageCheckPass = document.getElementById("modal-message-check-pass");
const btnLogin = document.getElementById("modal-login-btn");
const messageCheckFields = document.getElementById("modal-message-fields");

// functions for sing up

function checkInputValue(username, pass1, pass2) {
    if (!username || !pass1 || !pass2) {
        return false;
    } else {
        return true;
    }
}

function checkPass(pass1, pass2) {
    if (pass1 === pass2) {
        return true;
    } else {
        return false;
    }
}

function changeDisplay(element, display) {
    element.style.display = display;
}

wrapperModal.addEventListener("submit", e => {
    if (!checkInputValue(inputUsername.value, inputPass.value, inputPassAgain.value)) {
        changeDisplay(messageCheckFields, "block");
    } else if (!checkPass(inputPass.value, inputPassAgain.value)) {
        changeDisplay(messageCheckFields, "none");
        changeDisplay(messageCheckPass, "block");
    } else {
        changeDisplay(messageCheckFields, "none");
        changeDisplay(messageCheckPass, "none");

        server.PATCH("rootPassword", 0, {user: inputUsername.value, pass: inputPass.value});

        localStorage.setItem("loginValidation", 1);
        location.replace("./index.html");
    }

    e.preventDefault();
});
