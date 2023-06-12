// document.querySelector(".button").addEventListener("click", function() {
//   console.log("yoButton");
//   console.log(chrome.cookies);
// })
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
            // login.style.display = "none"
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
      const profilesDiv = document.querySelector("#profiles");
      profilesDiv.innerHTML = '';

      data.profiles.forEach(profile => {
        const button = document.createElement('button');
        button.innerText = `Profil : ${profile.nickname} category : ${profile.category_id}`;
        button.addEventListener('click', () => console.log("clicked"));
        profilesDiv.appendChild(button);
    });
});
};

const changeCategory = (profileId, userToken) => {

  fetch(`http://localhost:3000/api/v1/profiles/${profileId}/change_category`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${userToken}`,
      'X-User-Token': userToken
    },
    body: JSON.stringify({ category_id: category_id })
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('La catégorie a été modifiée avec succès !');
        retrieveInfosFromUser(userToken);
      } else {
        alert('Une erreur est survenue lors de la modification de la catégorie.');
      }
    });
}
// const getCategories = (profiles) => {
// fetch("http://localhost:3000/api/v1/categories", {
//   method: "GET",
//   headers: {
//     "Content-Type": "application/json",
//     "Accept": "application/json",
//     "Authorization": `Bearer ${profiles}`,
//     "X-User-Token": profiles
//   },
// })
// }
