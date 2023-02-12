chrome.runtime.onMessage.addListener((msg, sender) => {
    // First, validate the message's structure.
    if ((msg.from === 'evil') && (msg.subject === 'showPageAction') && (sender.tab) && (sender.tab.id)) {
      // Enable the page-action for the requesting tab.
      chrome.pageAction.show(sender.tab.id);
    }
  });