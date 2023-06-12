chrome.runtime.sendMessage({ message: 'executeScript' });
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'updateDOM') {
    const modifiedDOM = request.modifiedDOM;
    const container = document.body;
    container.innerHTML = modifiedDOM;

    let green = document.querySelectorAll(".green");
    let red = document.querySelectorAll(".red");



      for(let i = 0; i < green.length; i++){
       
        green[i].style.color = "white";
        green[i].style.borderRadius = "10px";
        green[i].style.backgroundColor = "green";
      }



      for(let i = 0; i < red.length; i++){

        red[i].style.color = "white";
        red[i].style.borderRadius = "10px";
        red[i].style.backgroundColor = "red";
      }

  }
});
