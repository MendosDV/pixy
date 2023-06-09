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

function retrieveInfosFromUser(userToken) {
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
      data.profiles.forEach(profile => {
        profilesDiv.innerHTML += `<div><a href="${profile.url}">${profile.nickname}</a></div>`;
      });
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
