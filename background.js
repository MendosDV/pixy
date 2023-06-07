chrome.runtime.onMessage.addListener(messageFromContent = (request, sender, sendResponse) => {
  console.log(request.message);
});


// Add URL to visitedSites
const visitedSites = [];
chrome.tabs.onUpdated.addListener(addUrl= (tabId, changeInfo, tab) => {
  console.log("updated")
  if (changeInfo.status === 'complete' && tab.active) {
    visitedSites.push({title: tab.title, url: tab.url});
    console.log(visitedSites);
  }

  chrome.tabs.executeScript({
    code:  `const text = document.body.innerHTML;
    const modifiedText = text.replace(/chat/g, "chien");
    document.body.innerHTML = modifiedText;`
  });
});
