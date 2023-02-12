const response = new Promise((resolve, reject) => {
    resolve(chrome.storage.sync.get("EvilMode"))}
);

response.then(res => {
    if(res) {
        const allButtons = document.getElementsByTagName("button");

        const filteredArray = Array.from(allButtons).filter((element) =>
          element?.textContent?.includes("checkout")
        );
      
        filteredArray.forEach((element) => {
          // element.parentNode?.removeChild(element);
          console.log(element + " " + element.textContent);
        });
      
        chrome.runtime.sendMessage({
          from: "evil",
          subject: "showPageAction",
        });
    }
});

export {};