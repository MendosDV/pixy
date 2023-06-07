chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  fetch("www.notrerails.com?dom=" + request.DOM, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(response => response.text()).then(text => {
    console.log(text);
  })
});

const sendFromContent = () => {
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
