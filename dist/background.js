(()=>{function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}var e,n="";function o(t){chrome.tabs.get(t,(function(t){var o=String(t.url),u=String(chrome.runtime.id);-1==e.search(u)&&["https://www.youtube.com/","https://m.youtube.com/"].map((function(e){o==e&&(n="",r(t.tabId))})),-1!=o.search("watch")&&(""==n?n=o:n!=o&&r(t.tabId)),e=String(t.url)}))}function r(t){setTimeout((function(){chrome.tabs.update(t,{url:"popup.html"})}),500)}e="",chrome.tabs.onActivated.addListener((function(t){setTimeout((function(){o(t.tabId)}),2e3)})),chrome.tabs.onUpdated.addListener((function(t){setTimeout((function(){o(t)}),2e3)})),chrome.runtime.onMessage.addListener((function(e){var n=String(t(e));"number"==n&&(e=6e4*e+2e4),chrome.tabs.query({currentWindow:!0,active:!0},(function(t){currentTabId=t[0].id,"number"==n&&setTimeout((function(){r(currentTabId)}),e),"string"==n&&setTimeout((function(){chrome.tabs.sendMessage(currentTabId,e)}),22e3)}))}))})();