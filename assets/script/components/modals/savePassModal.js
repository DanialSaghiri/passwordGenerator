import {modal} from "./../../modules/modalsFunction.js";
import {server} from "./../../modules/serverFunction.js";

// modal local data
export const rootUserPass = await server.GET("rootPassword").then(data => data[0].pass);

// modal Complex Modules Variables
const savePassModalBackGround = document.getElementById("modals-wrapper");
const modalSavePass = document.getElementById("save-pass-modal");

//modal DOM elements Variables
const savePassGeneratedBtn = document.getElementById("save-pass-generated-btn");
const modalCloseBtn = document.getElementById("save-pass-modal-close-btn");
const modalInputWebsiteName = document.getElementById("input-website-name");
const modalInputCheckUserRootPass = document.getElementById("input-user-pass");
const modalWrongRootPassAlert = document.getElementById("wrong-pass-alert");
const modalOpenLogoAddressBtn = document.getElementById("open-btn-url-logo");
const modalLogoAddressInput = document.getElementById("input-logo-url");
const generatedPasswordInput = document.getElementById("result-input");

// modal Complex Modules Events
savePassGeneratedBtn.addEventListener("click", modal.savePass.show);

savePassModalBackGround.addEventListener("click", () => {
    hideCustomUrlInput();
    modal.savePass.hide();
});

//modal DOM elements Events
modalSavePass.addEventListener("click", function (e) {
    e.stopPropagation();
});

//modal Mock Server Events
modalSavePass.addEventListener("submit", e => {
    e.preventDefault();

    const password = generatedPasswordInput.innerHTML;
    let websiteName = modalInputWebsiteName.value.trim();
    let enteredRootPass = modalInputCheckUserRootPass.value;
    let customLogoUrl = modalLogoAddressInput.value.trim();
    let data;

    modalInputWebsiteName.focus();

    if (!enteredRootPass || !websiteName) {
        modalInputWebsiteName.style.borderColor = "#00ddff";
        modalInputCheckUserRootPass.style.borderColor = "#00ddff";
        alert("please fill all inputs");
    } else if (enteredRootPass !== rootUserPass) {
        modalInputCheckUserRootPass.focus();
        modalWrongRootPassAlert.style.left = "0";
    } else {
        data = {
            websiteName,
            password,
            customLogoUrl: customLogoUrl ?? "",
            strength: passwordStrengthCheck(password),
        };
        server.POST("passwords", data);

        modalInputWebsiteName.value = "";
        modalInputCheckUserRootPass.value = "";
        modalLogoAddressInput.value = "";
        hideCustomUrlInput();
        modal.savePass.hide();
    }
});

modalOpenLogoAddressBtn.addEventListener("click", () => {
    modalOpenLogoAddressBtn.style.left = "0";
    modalOpenLogoAddressBtn.style.top = "0";
    modalOpenLogoAddressBtn.style.transform = "translate(0,0)";
    modalLogoAddressInput.style.bottom = "0";
});

modalCloseBtn.addEventListener("click", () => {
    modalWrongRootPassAlert.style.left = "-100%";
    hideCustomUrlInput();
    modal.savePass.hide();
});

// <-----------Password's strength Algorithm--------->
function passwordStrengthCheck(password) {
    const pointLower = 1;
    const pointDigit = 2;
    const pointUpper = 3;
    const pointSpecialChar = 3;
    let lowerCount = 0;
    let upperCount = 0;
    let digitCount = 0;
    let specialCharCount = 0;
    let allPoint;

    for (let i = 0; i < password.length; i++) {
        if (password[i] >= "a" && password[i] <= "z") {
            lowerCount++;
        } else if (password[i] >= "A" && password[i] <= "Z") {
            upperCount++;
        } else if (password[i] >= "0" && password[i] <= "9") {
            digitCount++;
        } else {
            specialCharCount++;
        }
    }

    allPoint =
        lowerCount * pointLower +
        upperCount * pointUpper +
        digitCount * pointDigit +
        specialCharCount * pointSpecialChar;

    if (allPoint <= 30) {
        return "Weak";
    } else if (allPoint > 30 && allPoint <= 45) {
        return "Normal";
    } else if (allPoint > 45 && allPoint <= 55) {
        return "Good";
    } else {
        return "Strong";
    }
}

function hideCustomUrlInput() {
    modalOpenLogoAddressBtn.style.left = "";
    modalOpenLogoAddressBtn.style.top = "";
    modalOpenLogoAddressBtn.style.transform = "";
    modalLogoAddressInput.style.bottom = "";
}
