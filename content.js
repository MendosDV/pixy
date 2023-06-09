

chrome.runtime.sendMessage({ message: 'executeScript' });
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'updateDOM') {
    const modifiedDOM = request.modifiedDOM;
    const container = document.body;
    container.innerHTML = modifiedDOM;
  }
});
