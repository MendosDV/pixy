chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  fetch("http://localhost:3000/process_dom=", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      DOM: request.DOM
    })
  }).then(response => response.text()).then(text => {
    console.log(text);
  })
  // console.log('reques', request);
  // console.log( 'sender' ,sender);
  // console.log('sendresponse',sendResponse);
  // console.log('localhost:3000/process_dom=' + request.DOM)


});

const sendFromContent = () => {
  // console.log(document.body.innerHTML);
  chrome.runtime.sendMessage({ DOM: document.body.innerHTML });
}

const visitedSites = [];
chrome.tabs.onUpdated.addListener(addUrl= (tabId, changeInfo, tab) => {
  console.log("updated")
  if (changeInfo.status === 'complete' && tab.active) {
    visitedSites.push({title: tab.title, url: tab.url});
    console.log(visitedSites);

    chrome.scripting.executeScript({
      target: { tabId: tabId },
      func: sendFromContent
    });
  }
});
