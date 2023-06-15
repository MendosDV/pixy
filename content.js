chrome.runtime.sendMessage({ message: 'executeScript' });  // send message to background

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) { // listen for message from background
  // let loader = `<div style="width: 100%; position: absolute;" class="boxLoading">Salope !!!!!!!!</div>`
  const style = `
  <style>
    pixy-explication {
      position: relative;
      display: none;
      width: 48vh;
      padding: 28px;
      border-radius: 8px;
      background-color: rgba(255, 255, 255, 1);
      box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(15px);
      font-family: arial ,sans-serif;
      z-index: 9999;
    }

    pixy-word {
      font-size: 1.2rem;
      color: rgb(0, 0, 0);
      padding-bottom: 0.4rem;
      padding-right: 0.3rem;
      font-family: arial ,sans-serif;
      font-weight: bold;
    }

    pixy-description {
      font-size: 1rem;
      font-family: arial ,sans-serif;
      color: #3d3d3d;
    }

    pixy-warning {
      display: none;
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 20vw;
      padding: 35px;
      border: 1px solid rgba(255, 255, 255, .25);
      border-radius: 8px;
      background-color: rgb(255, 209, 181);
      box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.25);
      backdrop-filter: blur(15px);
      opacity: 1;
      z-index: 9999;
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
      padding-bottom: 0.4rem;
    }

    pixy-dico {
      display: flex;
      align-items: center;
      width: 100%;
      border-bottom: 1px solid rgba(22, 38, 141,0.4);
      padding-bottom: 0.1rem;
      margin-bottom: 1.1rem;
    }

    dico {
      padding-left: 0.4rem;
      color: #16268D;
      font-family: arial ,sans-serif;
      font-size: 1.1rem;
      font-weight: bold;
    }

    pixy-category {
      color: #16268D;
      font-family: arial ,sans-serif;
      font-size: 1rem;
    }

    pipe {
      padding-right: 0.3rem;
      color: #16268D;
      font-family: arial ,sans-serif;
      font-size: 1rem;
    }
  </style>
`;

  if (request.action === 'updateDOM') { // if action is updateDOM
    const modifiedBODY = request.modifiedBODY;
    const modifiedHEAD = request.modifiedHEAD; // get modifiedDOM from request
    const body = document.body; // get body from body
    const head = document.head;

    body.innerHTML = modifiedBODY; // set modifiedDOM to body (body)
    head.innerHTML = modifiedHEAD;

    document.head.insertAdjacentHTML('beforeend', style);

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
      pixy.style.textDecoration = 'underline rgb(204, 81, 81) wavy'
      pixy.style.textDecorationThickness = '1px'

      if (level === 'low') {
        if (pixy) {
          let pixyWarning = document.querySelector('pixy-warning');
          pixyWarning.style.display = "block";
          setTimeout(function() {
            fadeOut(pixyWarning);
          }, 7000);
        }
      }

      else if (level === 'medium') {
        let pixyExplication = pixy.querySelector("pixy-explication");

        pixy.addEventListener("click", function(event) {
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
          }, 7000);
        }

        let pixyExplication = pixy.querySelector("pixy-explication");

        pixy.addEventListener("click", function(event) {

          pixyExplication.style.display = "block";
          pixyExplication.style.position = "fixed";
          pixyExplication.style.bottom = "24px";
          pixyExplication.style.right = "24px";
        })
      }
    });
  }
});
