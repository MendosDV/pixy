
const container = document.querySelector("#container");
const login = document.querySelector("#login")
const profilesDiv = document.querySelector("#profiles")


function logIn() {
  if (chrome.cookies) {
    chrome.cookies.get(
      { url: "http://localhost:3000", name: "signed_id" },
      function (cookie) {
        if (cookie) {
          setTimeout(() => {
            const userToken = cookie.value
            console.log(userToken)
            login.style.display = "none"
            retrieveInfosFromUser(userToken)
          , 100
          })
        } else {
          login.style.display = "block";
        }
      }
    );

  }
}

logIn();

const retrieveInfosFromUser = (userToken) => {
  fetch("http://localhost:3000/api/v1/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${userToken}`,
      "X-User-Token": userToken
    },
  })
    .then(response => response.json())
    .then(data => {
      // console.log(data);
      // console.log(data.user);
      const profilesDiv = document.querySelector("#profiles");
      profilesDiv.innerHTML = '';

      data.profiles.forEach(profile => {
        const button = document.createElement('button');
        button.classList.add('btn')
        if (data.user.current_category_id == profile.infos.category_id) {
          button.style.backgroundColor = "#3BC7FE"
        }
        button.innerText = `Profil : ${profile.infos.nickname} category : ${profile.category.name} `;
        if (profile.category.name === "Faible") {
          button.insertAdjacentHTML("beforeend", "<div class='shield'><i class='fas fa-shield-alt'></i></div>");
        }

        else if (profile.category.name === "Modéré") {
          button.insertAdjacentHTML("beforeend", "<div class='shield'><i class='fas fa-shield-alt'></i><i class='fas fa-shield-alt'></i></div>");
        }
        else if (profile.category.name === "Elevé") {
          button.insertAdjacentHTML("beforeend", "<div class='shield'><i class='fas fa-shield-alt'></i><i class='fas fa-shield-alt'></i><i class='fas fa-shield-alt'></i></div>");

        }
        button.insertAdjacentHTML('beforeend', profile.picture);
        button.addEventListener('click', () => {
          // console.log("clicked")
          changeCategory(profile.infos.id);
        });
        profilesDiv.appendChild(button);
    });
});
};

const changeCategory = (profileId) => {
  chrome.cookies.get(
    { url: "http://localhost:3000", name: "signed_id" },
    function (cookie) {
        fetch(`http://localhost:3000/api/v1/users/change_category`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${cookie.value}`,
            'X-User-Token': cookie.value
          },
          body: JSON.stringify({ profile_id: profileId })
        })
          .then(response => response.json())
          .then(data => {
            // console.log(data);
            if (data.success) {
              alert('La catégorie a été modifiée avec succès !');
              // retrieveInfosFromUser(userToken);
              // chrome.runtime.sendMessage({ DOM: document.body.innerHTML });

            } else {
              alert('Une erreur est survenue lors de la modification de la catégorie.');
            }
          });

    });
}
