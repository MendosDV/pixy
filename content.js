

chrome.runtime.sendMessage({ message: 'executeScript' });
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'updateDOM') {
    const modifiedDOM = request.modifiedDOM;
    const container = document.body;
    container.innerHTML = modifiedDOM;
  }
});
//   console.log("yoContent");

// const mot = /\bs[a@#$%^&*()+=\[\]{};':"\\|,.<>\/?`~éèêëēĕėęěèéêëēĕėęě]s?/gmi;
// const replace = "Yoann";

// const body = document.querySelector("body").textContent
// console.log(body);
// console.log(body.length);


// const text = document.body.innerHTML;
// const modifiedText = text.replace(/chat/g, "chien");
// document.body.innerHTML = modifiedText;
