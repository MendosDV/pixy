chrome.runtime.sendMessage({ message: 'executeScript' });  // send message to background

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) { // listen for message from background
  let loader = `<div style="width: 100%; position: absolute;" class="boxLoading">Salope !!!!!!!!</div>`

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
          pixyExplication.style.backgroundColor = "black";
          pixyExplication.style.top = pixy.top;
          pixyExplication.style.left = pixy.left;
        })
      }
      else {
        pixy.style.color = "yellow";

        pixy.addEventListener("click", function() {
          let pixyExplication = pixy.querySelector("pixy-explication");
          pixyExplication.style.display = "block";
          pixyExplication.style.backgroundColor = "black";
          pixyExplication.style.top = pixy.top;
          pixyExplication.style.left = pixy.left;
        })
      }
    });
  }
});
