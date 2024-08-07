const profilesWrapper = document.getElementById("profiles-wrapper");
const usersData = [
    {
        name: "Danial Saghiri",
        id: "danialsaghiri",
        email: "danial.saghiri83@gmail.com",
        github: "https://github.com/danialsaghiri",
        linkedin: "https://www.linkedin.com/in/DanialSaghiri",
    },
    {
        name: "Aida Hashemi",
        id: "AidaHashemi",
        email: "aidahashemiam@gmail.com",
        github: "https://github.com/AidaHashemi",
        linkedin: "https://www.linkedin.com/in/aida-hashemi-a06390297/",
    },
    {
        name: "Mahdieh Dehghan",
        id: "madidqn",
        email: "madidgn82@gmail.com",
        github: "https://github.com/madidqn",
        linkedin: "https://www.linkedin.com/in/mahdieh-dehqan-2451202ba",
    },
    {
        name: "Amin Ansari Mehr",
        id: "AminAnsariMehr",
        email: "aminansarimehrgeek23@gmail.com",
        github: "https://github.com/AminAnsariMehr",
        linkedin: "https://www.linkedin.com/in/aminansarimehr/",
    },
    {
        name: "Ali Majidi",
        id: "ali-mjidi",
        email: "amajidi1382@gmail.com",
        github: "https://github.com/ali-mjidi",
        linkedin: "https://linkedin.com/in/ali-majidi-289062275",
    },
];

usersData.forEach(async userData => {
    const res = await fetch(`https://api.github.com/search/users?q=${userData.id}`);
    const users = await res.json();
    const {name: userName, email: userEmail, github: userGithub, linkedin: userLinkedin} = userData;
    const user = users.items;
    createUsers(user, userName, userEmail, userGithub, userLinkedin);
});

// createUsers(Loop) ==>
function createUsers(user, userName, userEmail, userGithub, userLinkedin) {
    profilesWrapper.innerHTML += `
              <div class="profileDeveloper">
                <section class="profileDeveloper__header">
                  <img class="profileDeveloper__avatarImage" src="${user[0].avatar_url}" />
                  <h3 class="profileDeveloper__name">${userName}</h3>
                </section>

                <section class="profileDeveloper__contactLinks">
                  <div class="profileDeveloper__linksWrapper">
                    <i class="fa-brands fa-github profileDeveloper__linkIcons"></i>
                    <a
                      href="${userGithub}"
                      class="profileDeveloper__githubLinkPage"
                      target="_blank">
                      Github
                    </a>
                  </div>

                  <div class="profileDeveloper__linksWrapper">
                    <i class="fa-brands fa-linkedin profileDeveloper__linkIcons"></i>
                    <a
                      href="${userLinkedin}"
                      class="profileDeveloper__linkedinLinkPage"
                      target="_blank">
                      Linkedin
                    </a>
                  </div>

                  <div class="profileDeveloper__linksWrapper">
                    <i class="fa-solid fa-envelope profileDeveloper__linkIcons"></i>
                    <a href="${userEmail}" class="profileDeveloper__gmailLinkPage" target="_blank">
                      Gmail
                    </a>
                  </div>
                </section>
              </div>`;
}
