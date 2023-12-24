
chrome.runtime.onInstalled.addListener(() => {
   chrome.contextMenus.create({
      id: "saveLatexFormulas",
      title: "Save LaTeX Formulas",
      contexts: ["all"]
   });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
   if (info.menuItemId === "saveLatexFormulas") {
      chrome.tabs.sendMessage(tab.id, { text: "extract_latex" });
   }
});

function saveFormulas(formulas, title) {
    const lines = formulas.join('\n');
    const url = 'data:text/plain;base64,' + btoa(unescape(encodeURIComponent(lines)));
    chrome.downloads.download({
       url: url,
       filename: title + ".txt",
       conflictAction: "uniquify",
       saveAs: true
    }, function(downloadId) { console.log('Download started:', downloadId); });
}

chrome.runtime.onMessage.addListener((request, sender) => {
   if (request.action === "save") {
      saveFormulas(request.data, request.title);
   }
});

