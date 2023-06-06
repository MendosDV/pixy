chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log(request.message);
});

const URL = [];
const TITLE = [];

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {

});
