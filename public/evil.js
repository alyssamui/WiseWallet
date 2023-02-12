const response = new Promise((resolve, reject) => {
  resolve(chrome.storage.local.get("EvilMode"));
});

response.then((res) => {
  console.log(res);
  if (res["EvilMode"]) {
    const allButtons = Array.from(document.getElementsByTagName("button"));
    // const allInputs = Array.from(document.getElementsByTagName("input"));
    const allSpans = Array.from(document.getElementsByTagName("span"));
    // const allDivs = Array.from(document.getElementsByTagName("div"));
    // const allAs = Array.from(document.getElementsByTagName("a"));
    const all = allButtons.concat(allSpans);
    const filteredArray = all.filter((element) =>
      element?.textContent?.includes("checkout")
    );

    filteredArray.forEach((element) => {
      const parent = element.parentNode;

      parent.appendChild(contentBlocker(element));
      parent.removeChild(element);
    });

    chrome.runtime.sendMessage({
      from: "evil",
      subject: "showPageAction",
    });
  }
});

const contentBlocker = (element) => {
  let queryOptions = { active: true, lastFocusedWindow: true };
  let counter = 0;
  const replacement = document.createElement("button");
  applyStyling(replacement);
  replacement.type = "button";
  replacement.onclick = () => {
    counter++;
    console.log(counter);
    if (counter >= 5) {
      chrome.tabs.getCurrent((tab) => {
        console.log(tab);
      });
      let [tab] = chrome.tabs.query(queryOptions);
    }
  };
  return replacement;
};

const applyStyling = (button) => {
  button.style.borderRadius = "50px";
  button.style.background = "#e0e0e0";
  button.style.boxShadow = "20px 20px 60px #bebebe, -20px -20px 60px #ffffff";
  button.style.height = "3rem";
  button.style.width = "100%";
  button.style.border = "none";
  button.textContent = "DON'T BUY";
};

chrome.runtime.sendMessage({
  from: "evil",
  subject: "showPageAction",
});
