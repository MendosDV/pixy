chrome.runtime.onMessage.addListener((request, sender, sendResponse) => { // listen for message from background
  if (request.DOM) { // if DOM is passed
    fetch("http://localhost:3000/api/v1/process_dom", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        dom: request.DOM,
        visitedSites: visitedSites // get DOM from request
      })
    }).then(response => response.json())
      .then(data => {
        const modifiedDOM = data.modifiedDOM; // get modifiedDOM from response
        chrome.tabs.sendMessage(sender.tab.id, { action: 'updateDOM', modifiedDOM: modifiedDOM }); // send modifiedDOM to content
    })
  }
});

const sendFromContent = () => {
  chrome.runtime.sendMessage({ DOM: document.body.innerHTML });
}

const visitedSites = [];
chrome.tabs.onUpdated.addListener(addUrl= (tabId, changeInfo, tab) => { // listen for tab changes
  console.log("updated")
  if (changeInfo.status === 'complete' && tab.active) { // if tab is active and status is complete
    visitedSites.push({title: tab.title, url: tab.url}); // add url to visitedSites
    console.log(visitedSites);
    chrome.scripting.executeScript({ // send message to background from content.js
      target: { tabId: tabId },
      func: sendFromContent
    });
  }
});
