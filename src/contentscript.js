const stringLocation = String(window.location.href);

const body = document.getElementsByTagName("body")[0];

chrome.runtime.onMessage.addListener((message) => {
  h1.innerHTML = "Seus objetivos são: " + message;
});

const h1 = document.createElement("h1");
h1.innerHTML = "Seus objetivos são:";
h1.style.top = "0";
h1.style.left = "0";
h1.style.background = "white";
h1.style.fontSize = "14px";
h1.style.zIndex = "99999999";
h1.style.position = "sticky";

// put the h1 in a container that is white
const container = document.createElement("div");
container.style.background = "white";
container.style.top = "0";
container.style.left = "0";
container.style.zIndex = "99999999";
container.style.display = "flex";
container.style.alignItems = "center";
container.style.position = "sticky";

container.appendChild(h1);

// put the container in the body
body.prepend(container);
