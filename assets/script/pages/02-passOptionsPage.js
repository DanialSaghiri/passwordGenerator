import {createPassword} from "./01-passGenPage.js";
//-------DOM elements--------
const toggleElement = document.getElementById("options-icon-toggle");
const toggleLableElement = document.getElementById("options-icon-toggle-lable");
const lowerCaseElement = document.getElementById("options-lower-case");
const upperCaseElement = document.getElementById("options-upper-case");
const numberElement = document.getElementById("options-numbers");
const symbolElement = document.getElementById("options-symbol");
const inputPassElement = document.getElementById("options-input-pass");
const inputCheckbox = document.querySelectorAll(".passOptionsPage__checkbox");
const inputCheckBoxCustom = document.querySelectorAll(".customUser");
const checkBoxCustom = document.getElementById("user-custom");

// ------------ Expression Functions
const savePasswordCharacters = (characters = inputPassElement.value) =>
    localStorage.setItem("passwordCharacters", characters);

export const autoCreatePassword = () =>
    inputCheckBoxCustom[0].checked ? createPassword(inputPassElement.value) : createPassword();

// --------------icon toggle------------
checkboxDefaultView();

// Set input box's value to character set that user chose before closing program
inputPassElement.value = localStorage.getItem("passwordCharacters");

toggleElement.addEventListener("click", () => {
    toggleElement.classList.toggle("fa-toggle-on");
    toggleElement.classList.toggle("fa-toggle-off");

    // This condition checks that if toggle btn is activate or not
    if (toggleElement.classList.contains("fa-toggle-on")) {
        toggleLableElement.innerText = "On";
        checkboxDefaultView();
        checkBoxCustom.style.color = "black";
        inputPassElement.value = "";
    } else if (toggleElement.classList.contains("fa-toggle-off")) {
        toggleLableElement.innerText = "Off";

        inputPassElement.disabled = true;

        // Enable all checkboxes
        inputCheckbox.forEach(element => {
            element.disabled = false;
        });

        inputCheckBoxCustom.forEach(element => {
            element.disabled = true;
        });
        setInputValue();
    }
});

inputCheckBoxCustom[0].addEventListener("input", function () {
    if (this.checked) {
        // Enable all checkboxes
        inputCheckbox.forEach(element => {
            element.disabled = false;
        });
        inputCheckBoxCustom[1].checked = true;

        options();
        createPassword(inputPassElement.value);
    } else {
        checkboxDefaultView();
        savePasswordCharacters();
        createPassword();
    }
});

inputCheckBoxCustom[1].addEventListener("input", () => {
    createPassword(inputPassElement.value);
});
inputCheckBoxCustom[2].addEventListener("input", () => {
    createPassword(inputPassElement.value);
});
//------------------select option----------------
// Add click eventListener to all checkboxes to process on every check or uncheck
inputCheckbox.forEach(item => {
    item.addEventListener("click", () => {
        setInputValue();
        autoCreatePassword();
    });
});

//------send value input-----
inputPassElement.addEventListener("input", function () {
    // Checks that if input is empty, set lowercase and number by default and save it,
    // else save current input's value
    !this.value ? options() : !inputCheckBoxCustom[0].checked ? savePasswordCharacters() : null;

    autoCreatePassword();
});

// ------------------------- declaration functions
function options(
    isLowerChecked = true,
    isUpperChecked = false,
    isNumberChecked = true,
    isSymbolChecked = false,
) {
    let lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
    let upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let numberChars = "0123456789";
    let symbolChars = '!"#$%&*+"-./)(}{=><][~?';

    // Checks that if none of checkboxes are checked, set lowercase and number checkbox checked by default
    if (!isLowerChecked && !isUpperChecked && !isNumberChecked && !isSymbolChecked) {
        isLowerChecked = true;
        isNumberChecked = true;
    }

    let passwordCharacters = `${isLowerChecked ? lowerCaseChars : ""}${
        isUpperChecked ? upperCaseChars : ""
    }${isNumberChecked ? numberChars : ""}${isSymbolChecked ? symbolChars : ""}`;

    savePasswordCharacters(passwordCharacters);
    return passwordCharacters;
}

// Sets input's value
function setInputValue() {
    let isLowerChecked = lowerCaseElement.checked;
    let isUpperChecked = upperCaseElement.checked;
    let isNumberChecked = numberElement.checked;
    let isSymbolChecked = symbolElement.checked;

    options(isLowerChecked, isUpperChecked, isNumberChecked, isSymbolChecked);
}

// Sets checkboxes default styles
function checkboxDefaultView() {
    inputPassElement.disabled = false;

    inputCheckbox.forEach(element => {
        element.disabled = true;
        element.checked = false;
    });
    lowerCaseElement.checked = true;
    numberElement.checked = true;

    inputCheckBoxCustom.forEach(element => {
        element.disabled = false;
        element.checked = false;
    });
}
