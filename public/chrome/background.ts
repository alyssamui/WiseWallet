function injectedFunction() {
  document.body.style.backgroundColor = "orange";
}

chrome.action.onClicked.addListener((tab : any) => {
  chrome.scripting.executeScript({
    target : {tabId : tab.id},
    func : injectedFunction,
  });
  console.log("Work" + tab + " " + tab.id);
});

export {};
