// if the url is on my extension, don't even execute this file
function Goals() {
  if (url.search(chrome.runtime.id) != -1) return;

  // This content script is only run on accepted URLs.
  const body = document.getElementsByTagName("body")[0];

  // It basically appends to the top of the page a message with the goals you typed in popup.html.

  // This waits for the message that background.js sends. So the path is popup.html -> background.js -> contentscript.js (this file)

  chrome.runtime.onMessage.addListener((message) => {
    h1.innerHTML = "Your goals are: " + message;
  });

  const h1 = document.createElement("h1");
  h1.innerHTML = "Your goals are:";
  h1.style.top = "0";
  h1.style.left = "0";
  h1.style.background = "white";
  h1.style.fontSize = "14px";
  h1.style.zIndex = "99999999";
  h1.style.position = "sticky";

  const container = document.createElement("div");
  container.style.background = "white";
  container.style.top = "0";
  container.style.left = "0";
  container.style.zIndex = "99999999";
  container.style.display = "flex";
  container.style.alignItems = "center";
  container.style.position = "sticky";

  container.appendChild(h1);

  body.prepend(container);
}

Goals();
