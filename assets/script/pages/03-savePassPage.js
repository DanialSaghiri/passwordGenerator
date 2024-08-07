import {server} from "./../modules/serverFunction.js";

const savedPassItemPage = document.getElementById("saved-passwords-wrapper");
const savedPasswordElements = savedPassItemPage.children;
const inputSearch = document.getElementById("searchBox");
const btnSort = document.getElementById("btnSort");
const optionsDropdown = document.getElementById("optionSort");
const letterSortBtn = document.getElementById("Letters");
const dateSortBtn = document.getElementById("Date");

// Show password elements sorted by date by default
sortByDate();

// <--------------------- Search box feature ---------------------------->
inputSearch.addEventListener("input", function () {
    for (const password of savedPasswordElements) {
        const websiteName = password.children[0].children[1].innerText.toLowerCase();

        if (!websiteName.includes(this.value.toLowerCase())) {
            password.classList.add("savePass__changeDisplaySearch");
        } else {
            password.classList.remove("savePass__changeDisplaySearch");
        }
    }
});

// <--------------------- Sort feature ---------------------------->
btnSort.addEventListener("click", () =>
    optionsDropdown.classList.toggle("savePass__dropdownOption--hide"),
);

letterSortBtn.addEventListener("click", sortByLetter);

dateSortBtn.addEventListener("click", sortByDate);

// -------------------------------------- Declaration functions
function savedPassItemGenerator(
    itemId,
    websiteName,
    passValue,
    passwordLength,
    customLogoUrl,
    passwordStrength,
) {
    const defaultLogoUrl =
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwebstockreview.net%2Fimages%2Fwebsite-clipart-world-wide-web-19.png&f=1&nofb=1&ipt=8a18f6896f4dd4d12aa9397cc7d5a40b240eee04dc48afc0bdaa2ccab76d8073&ipo=images";
    savedPassItemPage.innerHTML += `
          <section class="savedPassItem" id=${itemId} >
            <div class="webSiteData">
              <img class="webSiteData__logo" src=${
                  customLogoUrl ? customLogoUrl : defaultLogoUrl
              } />
              <p class="webSiteData__name">${websiteName}</p>
            </div>
            <div class="passSpecs">
              <p class="savedPass" id="save-pass-value">${passValue}</p>
              <div class="passStrength">
                <span class="passStrength__strengthTitle">Strength:</span>
                <div class="passStrength__stringBar">
                  <div class="passStrength__stringBar-color ${passwordStrength}"></div>
                </div>
                <span class="passStrength__strengthStatus">${passwordStrength}</span>
              </div>
              <div class="passData">
                <span class="passData__length">Length: ${passwordLength}</span>
                <div class="passData__icons">
                  <div class="passData__iconView">
                    <i class="fa-duotone fa-eye viewIcon"></i>
                    <span class="passData__icons-text">View</span>
                  </div>
                  <div class="passData__iconCopy">
                    <i class="fa-duotone fa-copy copyIcon"></i>
                    <span class="passData__icons-text">Copy</span>
                  </div>
                  <div class="passData__iconEdit">
                    <i class="fa-duotone fa-pen-to-square editIcon"></i>
                    <span class="passData__icons-text">Edit</span>
                  </div>
                  <div class="passData__iconDelete">
                    <i class="fa-duotone fa-trash trashIcon"></i>
                    <span class="passData__icons-text">Delete</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
`;
}

function sortByDate() {
    savedPassItemPage.innerHTML = "";

    server.GET("passwords").then(data =>
        data.forEach(element => {
            const {id, websiteName, password, customLogoUrl, strength} = element;
            savedPassItemGenerator(
                id,
                websiteName,
                password,
                password.length,
                customLogoUrl,
                strength,
            );
        }),
    );
}

function sortByLetter() {
    savedPassItemPage.innerHTML = "";

    server.GET("passwords").then(data => {
        data.sort((current, next) => {
            let first = current.websiteName.toLowerCase();
            let second = next.websiteName.toLowerCase();
            if (first < second) return -1;
            if (first > second) return 1;
            return 0;
        });

        data.forEach(element => {
            const {id, websiteName, password, customLogoUrl, strength} = element;
            savedPassItemGenerator(
                id,
                websiteName,
                password,
                password.length,
                customLogoUrl,
                strength,
            );
        });
    });
}
