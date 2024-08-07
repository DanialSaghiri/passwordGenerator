import {modal} from "./../../modules/modalsFunction.js";
import {server} from "./../../modules/serverFunction.js";
import {rootUserPass} from "./savePassModal.js";

// DOM elements
const btnChangePass = document.getElementById("drop-down-menu-change-pass-btn");
const changePasswordModalBackground = document.getElementById("modals-wrapper");
const changePasswordModal = document.getElementById("modal-change-pass");
const changePasswordModalCloseBtn = document.getElementById("modal-change-pass-close-btn");
const changeFormModal = document.getElementById("modal-change-form");
const inputPassword = document.getElementById("modal-change-form-pass");
const inputNewPassword = document.getElementById("modal-change-form-new-pass");
const inputNewPassword2 = document.getElementById("modal-change-form-new-pass2");
const messageFields = document.getElementById("modal-change-pass-message-fields");
const messageCheckPassword = document.getElementById("modal-change-pass-message-check-pass");
const messageRootPass = document.getElementById("modal-change-pass-message-root-pass");

// modal Complex Modules Events
btnChangePass.addEventListener("click", modal.changePassword.show);
changePasswordModalBackground.addEventListener("click", modal.changePassword.hide);
changePasswordModalCloseBtn.addEventListener("click", modal.changePassword.hide);
changePasswordModal.addEventListener("click", e => {
    e.stopPropagation();
});

// submit form change password
changeFormModal.addEventListener("submit", e => {
    e.preventDefault();
    if (!inputPassword.value || !inputNewPassword.value || !inputNewPassword2.value) {
        messageFields.style.display = "block";
        messageCheckPassword.style.display = "none";
        messageRootPass.style.display = "none";
    } else if (inputPassword.value !== rootUserPass) {
        messageFields.style.display = "none";
        messageCheckPassword.style.display = "none";
        messageRootPass.style.display = "block";
    } else if (inputNewPassword.value !== inputNewPassword2.value) {
        messageFields.style.display = "none";
        messageCheckPassword.style.display = "block";
        messageRootPass.style.display = "none";
    } else {
        messageFields.style.display = "none";
        messageCheckPassword.style.display = "none";
        server.PATCH("rootPassword", 0, {pass: inputNewPassword.value});
    }
});
