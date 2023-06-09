chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.DOM) {
    fetch("http://localhost:3000/api/v1/process_dom", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        dom: request.DOM
      })
    }).then(response => response.json())
      .then(data => {
      console.log(data);



    })
  }
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
