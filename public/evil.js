const response = new Promise((resolve, reject) => {
  resolve(chrome.storage.local.get("EvilMode"));
});

chrome.runtime.sendMessage({
  from: "evil",
  subject: "showPageAction",
});

response.then((res) => {
  if (res["EvilMode"]) {
    const allButtons = Array.from(document.getElementsByTagName("button"));
    const allSpans = Array.from(document.getElementsByTagName("span"));
    const all = allButtons.concat(allSpans);
    const filteredArray = all.filter((element) => {
      const text = element.textContent.toLowerCase();
      return text.includes("checkout") || element?.textContent?.includes("buy");
    });

    filteredArray.forEach((element) => {
      const parent = element.parentNode;
      
      parent.removeChild(element);
      parent.appendChild(contentBlocker());
    });
  }
})

const contentBlocker = () => {
  let counter = 0;
  const replacement = document.createElement("button");
  applyStyling(replacement);
  replacement.type = "button";
  replacement.onclick = () => {
    counter++;
    console.log(counter);
    if (counter >= 5) {
      window.location.href = `https://giphy.com/search/no-money`;
    }
  };
  return replacement;
};

const applyStyling = (button) => {
  button.style.borderRadius = "50px";
  button.style.background = "#FF0000";
  button.style.height = "3rem";
  button.style.width = "100%";
  button.style.border = "none";
  button.textContent = "DON'T BUY";
  button.cursor = "pointer";
  button.style.marginTop = "2rem";
};


chrome.runtime.sendMessage({
  from: "evil",
  subject: "showPageAction",
});
