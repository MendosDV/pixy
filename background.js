chrome.runtime.onMessage.addListener((request, sender, sendResponse) => { // listen for message from background
  if (request.BODY && request.HEAD) { // if DOM is passed
    // create a loader
    fetch("http://localhost:3000/api/v1/process_dom", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        body: request.BODY,
        head: request.HEAD,  // get DOM from request
        visitedSite: visitedSite
      })
    }).then(response => response.json())
      .then(data => {
        const modifiedBODY = data.modifiedBODY; // get modifiedBODY from response
        const modifiedHEAD = data.modifiedHEAD; // get modifiedBODY from response
        chrome.tabs.sendMessage(sender.tab.id, { action: 'updateDOM', modifiedBODY: modifiedBODY, modifiedHEAD: modifiedHEAD }); // send modifiedDOM to content
    })
  }
});

const sendFromContent = () => {
  // console.log(document);
  chrome.runtime.sendMessage({ BODY: document.body.innerHTML, HEAD: document.head.innerHTML });
}
let visitedSite = {};

chrome.tabs.onUpdated.addListener(addUrl= (tabId, changeInfo, tab) => { // listen for tab changes
  console.log("updated")
  if (changeInfo.status === 'complete' && tab.active) { // if tab is active and status is complete
    visitedSite = {title: tab.title, url: tab.url}
    console.log(visitedSite);

    chrome.scripting.executeScript({ // send message to background from content.js
      target: { tabId: tabId },
      func: sendFromContent
    });
  }
});
