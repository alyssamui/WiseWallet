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
    const counter = 0;
    const filteredArray = all.filter((element) => {
      const text = element.textContent.toLowerCase();
      return text.includes("checkout") || element?.textContent?.includes("buy");
    });

    filteredArray.forEach((element) => {
      const parent = element.parentNode;
      
      parent.removeChild(element);
      parent.appendChild(contentBlocker());
      console(parent.firstChild);
      parent.firstChild.onClick = () => {
        counter++;
        console.log(counter);
        if (counter >= 5) {
          window.location.href = `https://giphy.com/search/no-money`;
          alert("");
        }
      };
    });
  }
})

const contentBlocker = () => {
  const replacement = document.createElement("button");
  applyStyling(replacement);
  replacement.type = "button";
  return replacement;
};

const applyStyling = (button) => {
  button.style.borderRadius = "50px";
  button.style.background = "#FF0000";
  button.style.height = "3rem";
  button.style.width = "100%";
  button.style.border = "none";
  button.textContent = "DON'T BUY";
};


chrome.runtime.sendMessage({
  from: "evil",
  subject: "showPageAction",
});
