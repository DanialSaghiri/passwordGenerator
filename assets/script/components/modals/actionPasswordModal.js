import {modal} from "./../../modules/modalsFunction.js";
import {server} from "./../../modules/serverFunction.js";
import {rootUserPass} from "./savePassModal.js";

const deletePasswordIcon = document.querySelectorAll(".trashIcon"); // Select delete icons;
const viewPasswordIcon = document.querySelectorAll(".viewIcon"); // Select view icons
const copyPasswordIcon = document.querySelectorAll(".copyIcon"); // Select copy icons
const editPasswordIcon = document.querySelectorAll(".editIcon"); // Select edit icons
const actionPasswordModal = document.getElementById("modal-actions-pass");
const actionPasswordModalCloseBtn = document.getElementById("modal-actions-pass-close-btn");
const actionModalBackground = document.getElementById("modals-wrapper");
const actionModalForm = document.getElementById("modal-actions-form");
const actionModalPassInput = document.getElementById("modal-actions-pass-input");
const actionModalSubmitBtn = document.getElementById("modal-action-submit-btn");
const savedPass = document.getElementById("save-pass-value");
const actionModalTitle = document.getElementById("action-modal-title");
const blockTime = localStorage.getItem("blockTime");
const maxAttempts = 3;
let attemptCount = 0;
let target;

////disable inputs and enable it
const accessibility = {
    disabledInput: () => {
        actionModalPassInput.disabled = true;
    },
    enabledInput: () => {
        actionModalPassInput.disabled = false;
    },
    disabledSubmit: () => {
        actionModalSubmitBtn.disabled = true;
    },
    enabledSubmit: () => {
        actionModalSubmitBtn.disabled = false;
    },
};

////select error message according to the situation
const error = {
    emptyValue: "Enter your password",
    wrongValue: () => `Password is wrong. Attempts left: ${maxAttempts - attemptCount}`,
    threeTimesWrongValue: "Access blocked for 15 seconds due to multiple failed attempts.",
};

// modal Complex Modules Events
actionModalBackground.addEventListener("click", modal.action.hide);
actionPasswordModalCloseBtn.addEventListener("click", modal.action.hide);
actionPasswordModal.addEventListener("click", e => {
    e.stopPropagation();
});

// create p tag for error message
const errorMessage = document.createElement("p");
errorMessage.classList.add("actionPasswordModal__error");

//submit form
actionModalForm.addEventListener("submit", event => {
    event.preventDefault();

    if (actionModalPassInput.value === "") {
        errorMessage.textContent = error.emptyValue;
        removeErrorMessage(errorMessage, 1000);
    } else if (actionModalPassInput.value !== rootUserPass) {
        attemptCount++;

        if (attemptCount < maxAttempts) {
            errorMessage.textContent = error.wrongValue();
            removeErrorMessage(errorMessage, 1000);
        } else {
            // Block user access for 15 second(i will change it to 1 hour)
            accessibility.disabledInput();
            accessibility.disabledSubmit();

            localStorage.setItem("blockTime", Date.now() + 15000);
            errorMessage.textContent = error.threeTimesWrongValue;
            removeErrorMessage(errorMessage, 15000);

            setTimeout(() => {
                accessibility.enabledInput();
                accessibility.enabledSubmit();
                localStorage.removeItem("blockTime");
                attemptCount = 0;
            }, 15000);
        }
    } else if (actionModalPassInput.value === rootUserPass) {
        const iconType = handleIconClick.activeIcon;
        selectAction(iconType, target);
        modal.action.hide();
    }

    actionPasswordModal.appendChild(errorMessage);
    actionModalPassInput.value = "";
});

// User is still blocked
if (blockTime && Date.now() < blockTime) {
    accessibility.disabledInput();
    accessibility.disabledSubmit();

    localStorage.setItem("blockTime", Date.now() + 15000);
    errorMessage.textContent = error.threeTimesWrongValue;
    actionPasswordModal.appendChild(errorMessage);
    removeErrorMessage(errorMessage, 15000);

    setTimeout(() => {
        accessibility.enabledInput();
        accessibility.enabledSubmit();
        // localStorage.removeItem("blockTime");
        localStorage.setItem("blockTime", 0);
        attemptCount = 0;
    }, blockTime - Date.now());
}

// click on each action
deletePasswordIcon.forEach(icon => {
    icon.addEventListener("click", e => {
        target = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.id;
        handleIconClick(icon, "delete");
    });
});
viewPasswordIcon.forEach(icon => {
    icon.addEventListener("click", e => {
        target = e.target.parentElement.parentElement.parentElement.parentElement.children[0];
        handleIconClick(icon, "view");
    });
});
copyPasswordIcon.forEach(icon => {
    icon.addEventListener("click", e => {
        target = e.target.parentElement.parentElement.parentElement.parentElement.children[0];
        handleIconClick(icon, "copy");
    });
});
editPasswordIcon.forEach(icon => {
    icon.addEventListener("click", e => {
        target = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.id;
        handleIconClick(icon, "edit");
    });
});

////handle clicks on different icons
function handleIconClick(icon, iconType) {
    modal.action.show();
    actionModalPassInput.focus();
    handleIconClick.activeIcon = iconType;
    selectModalTitle(iconType);
}

//// choose modal's title according to selected icon
function selectModalTitle(iconType) {
    switch (iconType) {
        case "delete":
            actionModalTitle.textContent = "Are you sure you want to delete this password?";
            break;
        case "view":
            actionModalTitle.textContent = "Enter your password to view";
            break;
        case "copy":
            actionModalTitle.textContent = "Enter your password to copy";
            break;
        case "edit":
            actionModalTitle.textContent = "Enter your panel password to edit this password.";
            break;
    }
}

////choose an action according to iconType
function selectAction(iconType, target) {
    switch (iconType) {
        case "delete":
            handleAction.delete(target);
            break;
        case "view":
            handleAction.view(target);
            break;
        case "copy":
            handleAction.copy(target);
            break;
        case "edit":
            handleAction.edit(target);
            break;
        default:
            console.error("Unexpected icon type:", iconType);
    }
}

////handle each action
const handleAction = {
    delete: targetId => {
        server.DELETE("passwords", targetId);
    },

    view: target => {
        target.classList.add("show");
    },

    copy: target => {
        target.classList.contains("show") ? navigator.clipboard.writeText(target.innerText) : null;
    },

    edit: targetId => {
        const newSite = prompt("Enter new website name: ");
        server.PATCH("passwords", targetId, {websiteName: newSite});
    },
};

//// remove error message
function removeErrorMessage(errorMessage, delay) {
    setTimeout(() => errorMessage.remove(), delay);
}
