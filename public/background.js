chrome.runtime.onMessage.addListener((msg, sender) => {
    // First, validate the message's structure.
    if ((msg.from === 'evil') && (msg.subject === 'showPageAction') && (sender.tab) && (sender.tab.id)) {
      // Enable the page-action for the requesting tab.
      chrome.pageAction.show(sender.tab.id);
    }
    console.log("test1");
});
console.log("test2");

// chrome.action.onClicked.addListener((tab : any) => {
//   chrome.scripting.executeScript({
//     target: {tabId: tab.id},
//     files: ['evil.ts']
//   });
// });

export {}