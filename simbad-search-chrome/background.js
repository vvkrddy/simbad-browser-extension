chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    id: "highlightMenuItem",
    title: "Search in SIMBAD",
    contexts: ["selection"],
  });
});

// Basic query highlighted in SIMBAD
chrome.contextMenus.onClicked.addListener((item, tab) => {
  const highlightedWord = encodeURIComponent(item.selectionText);
  chrome.tabs.create({url: "http://simbad.cds.unistra.fr/simbad/sim-basic?Ident=" + highlightedWord + "&submit=SIMBAD+search"});
});

