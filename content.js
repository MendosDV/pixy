chrome.runtime.sendMessage({ message: 'executeScript' });
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'updateDOM') {
    const modifiedDOM = request.modifiedDOM;
    const container = document.body;
    container.innerHTML = modifiedDOM;

    let blured = document.querySelectorAll(".blur");

    for(let i = 0; i < blured.length; i++){
      blured[i].style.color = "white";
      blured[i].style.borderRadius = "10px";
      blured[i].style.backgroundColor = "green";
    }
  }
});
