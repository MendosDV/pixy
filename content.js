chrome.runtime.sendMessage({ message: 'executeScript' });  // send message to background

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) { // listen for message from background
  if (request.action === 'updateDOM') { // if action is updateDOM
    const modifiedDOM = request.modifiedDOM; // get modifiedDOM from request
    const container = document.body; // get body from container

    container.innerHTML = modifiedDOM; // set modifiedDOM to container (body)

    let pixies = document.querySelectorAll("pixy"); // get all pixies
    let pixyExplication = document.querySelector("pixy-explication") // for each pixy
    console.log(pixyExplication);

    pixies.forEach(pixy => {
      pixy.addEventListener("click", function() {
        let word = pixy.dataset.word;
        let description = pixy.dataset.description;
        pixyExplication.innerHTML = description;
        pixyExplication.style.display = "block";
        pixyExplication.style.top = pixy.top;
        pixyExplication.style.left = pixy.left;

      })
    })
  }
});
