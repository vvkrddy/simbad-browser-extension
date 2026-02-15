const api = typeof browser !== "undefined" ? browser : chrome;

api.runtime.onInstalled.addListener(() => {
  api.contextMenus.create({
    id: "search",
    title: "Search SIMBAD",
    contexts: ["selection"],
  });
});

// Basic query highlighted in SIMBAD
api.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId !== "search") return;
  const highlightedWord = encodeURIComponent(info.selectionText);
  api.tabs.create({
    url:
      "https://simbad.cds.unistra.fr/simbad/sim-basic?Ident=" +
      highlightedWord +
      "&submit=SIMBAD+search",
  });
});
