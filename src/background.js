var activeTabId, lastUrl, lastTitle;
var watching = "";

function getTabInfo(tabId) {
  chrome.tabs.get(tabId, function (tab) {
    const currentUrl = String(tab.url);

    if (currentUrl.search("chrome-extension") != -1) watching = "";
    
    if ((currentUrl == "https://www.youtube.com/" || currentUrl == "https://m.youtube.com/") && lastUrl != "chrome-extension://fbhbajcgdgohmiianoeboofhopmdnjpd/popup.html") 
    {
      setTimeout(() => {
        chrome.tabs.update(tab.tabId, {
          url: "popup.html",
        });
      }, 500);
      watching = "";
    } else if (String(tab.url).search("watch") != -1) {
      if (watching == "") {
        watching = String(tab.url);
      } else if (watching != String(tab.url)) {
        setTimeout(() => {
          chrome.tabs.update(tab.tabId, {
            url: "chrome-extension://fbhbajcgdgohmiianoeboofhopmdnjpd/popup.html",
          });
        }, 500);
      } 
    }

    lastUrl = String(tab.url);
  });
}

chrome.tabs.onActivated.addListener(function (activeInfo) {
  setTimeout(() => {
    getTabInfo(activeInfo.tabId);
  }, 2000);
});

chrome.tabs.onUpdated.addListener(function (tabId) {
  setTimeout(() => {
    getTabInfo(tabId);
  }, 2000);
});

chrome.runtime.onMessage.addListener((request) => {
  if (String(typeof request) == "number") {
    request = request * 60000;
    request += 20000;
  }

  function tabCallback(currentTabId) {
    if (String(typeof request) == "number") {
      setTimeout(() => {
        chrome.tabs.update(currentTabId.id, {
          url: "chrome-extension://fbhbajcgdgohmiianoeboofhopmdnjpd/popup.html",
        });
      }, request);
    }

    if (String(typeof request) == "string") {
      setTimeout(() => {
        chrome.tabs.sendMessage(currentTabId.id, request);
        console.log("Message Sent");
      }, 22000);
    }
  }

  chrome.tabs.query({ currentWindow: true, active: true }, function (tabArray) {
    tabCallback(tabArray[0]);
  });
});
