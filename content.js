chrome.runtime.sendMessage({ message: 'executeScript' });  // send message to background

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) { // listen for message from background
  // let loader = `<div style="width: 100%; position: absolute;" class="boxLoading">Salope !!!!!!!!</div>`
  const style = `
  <style>
    pixy-explication {
      position: relative;
      display: none;
      width: 25%;
      height: 25%;
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
    pixy-description pixy-text {
      font-size: 1rem;
      margin-top: 1.4rem;
    }

    pixy-warning {
      display: none;
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 18%;
      height: 8%;
      padding: 35px;
      border: 1px solid rgba(255, 255, 255, .25);
      border-radius: 8px;
      background-color: rgb(255, 209, 181);
      box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.25);
      backdrop-filter: blur(15px);
      opacity: 1;
    }

    text {
      font-family: arial, sans-serif;
      color: #780000;
      font-size: 1rem;
    }

    warning {
      font-family: arial ,sans-serif;
      font-weight: bold;
      color: #780000;
      font-size: 1.2rem;
    }
  </style>
`;

  document.head.insertAdjacentHTML('beforeend', style);

  if (request.action === 'updateDOM') { // if action is updateDOM
    const modifiedDOM = request.modifiedDOM; // get modifiedDOM from request
    const container = document.body; // get body from container

    container.innerHTML = modifiedDOM; // set modifiedDOM to container (body)

    let pixies = document.querySelectorAll("pixy"); // get all pixies
    let explications = document.querySelectorAll("pixy-explication");

    document.addEventListener("click", function(event) {
      if (event.target.tagName != 'PIXY-EXPLICATION' && event.target.tagName != 'PIXY') {
        explications.forEach((explication) => {
          explication.style.display = "none";
        })
      }
    })

    function fadeOut(el) {
      let opacity = 1;

      let interval = setInterval(function() {
        if (opacity > 0) {
          opacity -= 0.1;
          el.style.opacity = opacity;
        } else {
          clearInterval(interval);
          el.style.display = 'none';
        }
      }, 50);
    }

    pixies.forEach((pixy) => {
      let level = pixy.dataset.level;
      pixy.style.textDecoration = 'underline #FF5050 wavy';

      if (level === 'low') {
        if (pixy) {
          let pixyWarning = document.querySelector('pixy-warning');
          pixyWarning.style.display = "block";
          // setTimeout(function() {
          //   fadeOut(pixyWarning);
          // }, 10000);
        }
      }

      else if (level === 'medium') {
        let pixyExplication = pixy.querySelector("pixy-explication");

        pixy.addEventListener("click", function(event) {
          // const rect = pixy.getBoundingClientRect();
          // let x = event.clientX - rect.left;
          // let y = event.clientY - rect.top;
          // console.log('Cursor position: ' + x + ',' + y);

          // x += 10;
          // y += 60;
          // pixyExplication.style.top = "" + y + "px";
          // pixyExplication.style.left = "" + x + "px";
          pixyExplication.style.display = "block";
          pixyExplication.style.position = "fixed";
          pixyExplication.style.bottom = "24px";
          pixyExplication.style.right = "24px";
        })
      }

      else {
        if (pixy) {
          let pixyWarning = document.querySelector('pixy-warning');
          pixyWarning.style.display = "block";
          setTimeout(function() {
            fadeOut(pixyWarning);
          }, 10000);
        }

        let pixyExplication = pixy.querySelector("pixy-explication");

        pixy.addEventListener("click", function(event) {
          // const rect = pixy.getBoundingClientRect();
          // let x = event.clientX - rect.left;
          // let y = event.clientY - rect.top;
          // console.log('Cursor position: ' + x + ',' + y);

          // y += 60;
          // pixyExplication.style.top = "" + y + "px";
          // pixyExplication.style.left = "" + x + "px";
          pixyExplication.style.display = "block";
          pixyExplication.style.position = "fixed";
          pixyExplication.style.bottom = "24px";
          pixyExplication.style.right = "24px";
        })
      }
    });
  }
});
