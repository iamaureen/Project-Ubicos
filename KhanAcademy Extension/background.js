
// background.js

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // Send a message to the active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
  });
});

// This block is new!
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "open_new_tab" ) {
      chrome.tabs.create({"url": request.url});
    }
  }
);


//fire when an internal link is clicked. only url is changed, page not completely reloaded
chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
  //https://developer.chrome.com/extensions/webNavigation
  console.log('reason for page navigation:', details.transitionType) //check background console
  //execute content script at page url change else content script is injected only the first time
  chrome.tabs.executeScript(null, {file:"content.js"});
  
});
