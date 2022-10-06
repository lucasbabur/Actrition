var activeTabId, lastUrl, lastTitle;
var watching = "";
lastUrl = ""

function getTabInfo(tabId) {
  chrome.tabs.get(tabId, function (tab) {

    let acceptedUrls = ["https://www.youtube.com/", "https://m.youtube.com/"];
    const currentUrl = String(tab.url);
    const extensionPageUrl = String(chrome.runtime.id)

    
    // If it's a playlist, just returns. If it's not, then follow the code.
    if (currentUrl.search("list") != -1) {
      return 0;
    }

    // If the currentUrl has watch, and watch is "", then set watch to currentUrl. If watch is not "", and currentUrl is not watch, then send to popup.
    if (currentUrl.search("watch") != -1) {
      if (watching == "") { watching = currentUrl } 
      else if (watching != currentUrl) { sendToPopup(tab.tabId) }
    }

    // Map through the accepted urls and check if the current url is one of them. If extension page is the last url, do nothing.
    if (lastUrl.search(extensionPageUrl) == -1){
      acceptedUrls.map((acceptedUrl) => { if (currentUrl == acceptedUrl && currentUrl.search("watch") == -1) { watching = ""; sendToPopup(tab.tabId) }});
    }

    

    lastUrl = String(tab.url);
  });
}

// If tab changes or is created, then process the URL and send to popup if necessary.
chrome.tabs.onActivated.addListener((activeInfo) => {
  setTimeout(() => {
    getTabInfo(activeInfo.tabId);
  }, 2000);
});

chrome.tabs.onUpdated.addListener((tabId) => {
  setTimeout(() => {
    getTabInfo(tabId);
  }, 2000);
});


chrome.runtime.onMessage.addListener((request) => {
  const typeofRequest = String(typeof request);

  // If the request is a number, convert it to minutes and add the waiting time (20 seconds)
  if (typeofRequest == "number") { request = (request * 60000) + 20000 }

  // If the request is a string, then it's a message for contentscript. If the request is a number, then it's the waiting time to send the tab to popup.
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabArray) {
    currentTabId = tabArray[0].id
    if (typeofRequest == "number") { setTimeout(() => { sendToPopup(currentTabId) }, request) }
    if (typeofRequest == "string") { setTimeout(() => { chrome.tabs.sendMessage(currentTabId, request) }, 22000) }
  });
});

// sendToPopup sends the tab to popup.html, you just need to provide the tabId.
function sendToPopup(tabId){
  setTimeout(() => {
    chrome.tabs.update(tabId, {
      url: "popup.html",
    });
  }, 500);
}

// Padrão
// https://yt3.ggpht.com/ytc/AMLnZu9XMOXt9eomL2-bICUdmY62Zk6aDc0nz0muqqztTA=s88-c-k-c0x00ffffff-no-rj
// https://yt3.ggpht.com/ytc/AMLnZu9kXPa0XU-bwqb0V4aXR8RSqMeQl_YyNvjwDVqe=s88-c-k-c0x00ffffff-no-rj

// https://www.youtube.com/c/FernandoUlrich_Oficial