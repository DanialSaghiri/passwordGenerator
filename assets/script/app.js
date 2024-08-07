// this files contains app's Menu and Header

if (localStorage.getItem("loginValidation") === null) {
    localStorage.setItem("loginValidation", 0);
}

if (!+localStorage.getItem("loginValidation")) {
    location.replace("./login.html");
}

if (localStorage.getItem("passwordCharacters") === null) {
    localStorage.setItem("passwordCharacters", "abcdefghijklmnopqrstuvwxyz0123456789");
}

// --------  Menu Section
const menu = $(".menu");
const menuIcon = $(".menu__burgerIcon");
const optionsWrapper = $(".menu__optionsWrapper");

// Just to collapse/expand menu navbar
menuIcon.addEventListener("click", () => {
    menu.classList.toggle("collapse");
});

// Select target option and show related page
optionsWrapper.addEventListener("click", e => {
    const selectedClassName = "option--selected";
    let targetOption;

    // Specifies user's target option
    if (e.target.classList.contains("option")) {
        targetOption = e.target;
    } else {
        targetOption = e.target.parentElement;
    }

    // This condition checks that if target option is already selected or not,
    // if target option is already selected it moves on and stop process
    if (!targetOption.classList.contains(selectedClassName)) {
        // Remove previous selected option
        for (let option of optionsWrapper.children) {
            if (option.classList.contains(selectedClassName)) {
                // TODO: optimize this section
                option.classList.remove(selectedClassName);
                $(`.${option.dataset.targetPage}`).style.display = "none";
            }
        }

        // Show selected option
        targetOption.classList.add(selectedClassName);
        $(`.${targetOption.dataset.targetPage}`).style.display = "flex";
    }
});

// This is a demo function that improve readability on selecting elements
// it's more like jquery way
function $(element) {
    return document.querySelector(element);
}

// ------ Header Section
const userRootIcon = document.getElementById("user-root-icon");
const dropDownMenu = document.getElementById("drop-down-menu");
const userDropdownWrapper = document.getElementById("user-dropdown-wrapper");

userRootIcon.addEventListener("click", () => {
    dropDownMenu.classList.toggle("active");
});

//close dropdown when clicking outside it
document.addEventListener("click", e => {
    const isClickInsideMenu = userDropdownWrapper.contains(e.target);

    if (!isClickInsideMenu) {
        dropDownMenu.classList.remove("active");
    }
});
