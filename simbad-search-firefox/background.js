browser.contextMenus.create({
    id: "search",
    title: "Search in SIMBAD",
    contexts: ["selection"]
  });
  
  browser.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "search") {
      const query = info.selectionText;
      browser.tabs.create({ url: "http://simbad.cds.unistra.fr/simbad/sim-basic?Ident=" + encodeURIComponent(query) + "&submit=SIMBAD+search" });
    }
  });
  