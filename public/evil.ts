
const allElements = document.getElementById("*");

console.log(allElements);

chrome.runtime.sendMessage({
    from: "evil",
    subject: "showPageAction",
});