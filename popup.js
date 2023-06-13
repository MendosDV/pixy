
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
      const profilesDiv = document.querySelector("#profiles");
      profilesDiv.innerHTML = '';

      data.profiles.forEach(profile => {
        const button = document.createElement('button');
        button.dataset.category_id = profile.category_id;
        button.classList.add('btn')
        button.innerText = `Profil : ${profile.nickname} category : ${profile.category_id}`;
        button.addEventListener('click', () => {
          // console.log("clicked")
          changeCategory(profile.category_id);
        });
        profilesDiv.appendChild(button);
    });
});
};

const changeCategory = (category_id) => {
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
          body: JSON.stringify({ category_id: category_id })
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
