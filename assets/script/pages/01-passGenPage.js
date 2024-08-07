import {autoCreatePassword} from "./02-passOptionsPage.js";

const rangeInput = document.getElementById("range-input");
const resultInput = document.getElementById("result-input");
const clipboardElement = document.getElementById("clip-board-btn");
const generateElement = document.getElementById("gen-pass-btn");
const currentLengthElement = document.getElementById("current-length");
// __________input range____
const slider = document.getElementById("range-input");
const min = slider.min;
const max = slider.max;
const value = slider.value;
const currentLengthIndicator = document.getElementById("current-length");
const passLength = document.querySelector(".passLength");
//__________value for page option___
const inputCustomPassPageOption = document.querySelectorAll(".customUser");
const inputPassElementPageOption = document.getElementById("options-input-pass");

// ************ assignment default value for range input  *************
slider.style.background = `linear-gradient(to right, #0078d7 0%,  #0078d7 ${
    ((value - min) / (max - min)) * 100
}%, #bbb ${((value - min) / (max - min)) * 100}%, #bbb 100%)`;

slider.oninput = function () {
    this.style.background = `linear-gradient(to right,  #0078d7 0%,  #0078d7 ${
        ((this.value - this.min) / (this.max - this.min)) * 100
    }%, #bbb ${((this.value - this.min) / (this.max - this.min)) * 100}%, #bbb 100%)`;
};

// ************ Logic display Span Of range value  *************
slider.addEventListener("input", () => {
    currentLengthIndicator.style.opacity = "1";
    passLength.style.gap = "60px";

    setTimeout(() => {
        currentLengthIndicator.style.opacity = "";
        passLength.style.gap = "";
    }, 3000);
});

export function createPassword(key = "") {
    const passwordCharacters = localStorage.getItem("passwordCharacters");
    const randomNumMax = passwordCharacters.length;
    let passString = "";

    for (let i = 0; i < rangeInput.value - key.length; i++) {
        passString += passwordCharacters[parseInt(Math.random() * randomNumMax)];
    }

    if (inputCustomPassPageOption[1].checked) resultInput.innerText = key + passString;
    else if (inputCustomPassPageOption[2].checked) resultInput.innerText = passString + key;
    else resultInput.innerText = passString;
}

window.addEventListener("load", () => {
    createPassword();
});

// generate new pass
generateElement.addEventListener("click", () => {
    autoCreatePassword();
});

// copy the pass
clipboardElement.addEventListener("click", () => {
    const password = resultInput.innerHTML;
    navigator.clipboard.writeText(password);
    alert("Password copied to clipboard");
});

// rangeInput value moves when range changes
rangeInput.addEventListener("input", () => {
    autoCreatePassword();

    currentLengthElement.textContent = rangeInput.value;
    currentLengthElement.style.left = `${((rangeInput.value - 7) / 93) * 100}%`;
});
