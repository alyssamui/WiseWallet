console.log("running");

const response = new Promise((resolve, reject) => {
    resolve(chrome.storage.local.get("EvilMode"))}
);

response.then(res => {
    if(res) {
        const allButtons = Array.from(document.getElementsByTagName("button"));
        // const allInputs = Array.from(document.getElementsByTagName("input"));
        const allSpans = Array.from(document.getElementsByTagName("span"));
        // const allDivs = Array.from(document.getElementsByTagName("div"));
        // const allAs = Array.from(document.getElementsByTagName("a"));
        const all = allButtons.concat(allSpans);
        const filteredArray = all.filter((element) =>
          element?.textContent?.includes("checkout")
        );

        console.log(filteredArray);
      
        filteredArray.forEach((element) => {
          element.parentNode.removeChild(element);
        });
      
        chrome.runtime.sendMessage({
          from: "evil",
          subject: "showPageAction",
        });
    }
});