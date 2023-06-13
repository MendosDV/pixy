chrome.runtime.sendMessage({ message: 'executeScript' });  // send message to background

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) { // listen for message from background
  // let loader = `<div style="width: 100%; position: absolute;" class="boxLoading">Salope !!!!!!!!</div>`
  const style = `
  <style>
    pixy-explication {
      width: 20vw;
      padding: 35px;
      border: 1px solid rgba(255, 255, 255, .25);
      border-radius: 8px;
      background-color: rgba(255, 255, 255, 0.45);
      box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.25);
      backdrop-filter: blur(15px);
    }
    pixy-word {
      font-size: 1.2rem;
      color: rgb(222, 175, 73);
      padding-bottom: 0.4rem;
      border-bottom: 1px solid rgb(222, 175, 73);
    }
    pixy-description {
      font-size: 1rem;
      margin-top: 1.4rem;
    }
  </style>
`;

  document.head.insertAdjacentHTML('beforeend', style);

  if (request.action === 'updateDOM') { // if action is updateDOM
    const modifiedDOM = request.modifiedDOM; // get modifiedDOM from request
    const container = document.body; // get body from container

    container.innerHTML = modifiedDOM; // set modifiedDOM to container (body)

    let pixies = document.querySelectorAll("pixy"); // get all pixies

    pixies.forEach((pixy) => {
      let level = pixy.dataset.level;
      pixy.style.textDecoration = 'underline orange wavy';

      if (level === 'low') {
        pixy.style.color = "purple";
      }
      else if (level === 'medium') {
        pixy.style.color = "blue";

        pixy.addEventListener("click", function() {
          let pixyExplication = pixy.querySelector("pixy-explication");
          pixyExplication.style.display = "block";
        })
      }
      else {
        pixy.style.color = "yellow";

        pixy.addEventListener("click", function() {
          let pixyExplication = pixy.querySelector("pixy-explication");
          pixyExplication.style.display = "block";
        })
      }
    });
  }
});
