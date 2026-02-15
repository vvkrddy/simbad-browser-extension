const api = typeof browser !== "undefined" ? browser : chrome;

document.addEventListener("DOMContentLoaded", () => {
  const searchButton1 = document.getElementById("search-button1");
  const searchBox1 = document.getElementById("search-box1");

  function updateBasicState() {
    searchButton1.disabled = searchBox1.value.trim().length === 0;
  }

  searchButton1.addEventListener("click", () => {
    const query = searchBox1.value.trim();
    if (!query) return;
    api.tabs.create({
      url:
        "https://simbad.cds.unistra.fr/simbad/sim-basic?Ident=" +
        encodeURIComponent(query) +
        "&submit=SIMBAD+search",
    });
  });

  searchBox1.addEventListener("input", updateBasicState);
  searchBox1.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      searchButton1.click();
    }
  });

  updateBasicState();
});

document.addEventListener("DOMContentLoaded", () => {
  const radios = document.querySelectorAll('input[type=radio][name=options]');
  const contentDivs = document.querySelectorAll("#content > div");

  function showOption(option) {
    for (let i = 0; i < contentDivs.length; i++) {
      contentDivs[i].style.display = contentDivs[i].id === option ? "block" : "none";
    }
  }

  showOption("option1");

  for (let i = 0; i < radios.length; i++) {
    radios[i].addEventListener("change", function () {
      showOption(this.value);
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const searchButton2 = document.getElementById("search-button2");
  const searchBox2 = document.getElementById("search-box2");

  function updateCoordState() {
    searchButton2.disabled = searchBox2.value.trim().length === 0;
  }

  searchButton2.addEventListener("click", () => {
    const query = searchBox2.value.trim();
    if (!query) return;

    const dropdown1 = document.getElementById("frame");
    const selectedOption1 = dropdown1.options[dropdown1.selectedIndex];
    const frame = selectedOption1.value;

    const dropdown2 = document.getElementById("system");
    const selectedOption2 = dropdown2.options[dropdown2.selectedIndex];
    const system = selectedOption2.value;

    const dropdown3 = document.getElementById("radius-unit");
    const selectedOption3 = dropdown3.options[dropdown3.selectedIndex];
    const radiusUnit = selectedOption3.value;

    const epoch = document.getElementById("epoch").value;
    const equinox = document.getElementById("equinox").value;
    const radiusSearch = document.getElementById("radius-search").value;

    api.tabs.create({
      url:
        "https://simbad.cds.unistra.fr/simbad/sim-coo?Coord=" +
        encodeURIComponent(query).replace(/%20/g, "+") +
        "&CooFrame=" +
        encodeURIComponent(system) +
        "&CooEpoch=" +
        encodeURIComponent(epoch) +
        "&CooEqui=" +
        encodeURIComponent(equinox) +
        "&CooDefinedFrames=" +
        encodeURIComponent(frame) +
        "&Radius=" +
        encodeURIComponent(radiusSearch) +
        "&Radius.unit=" +
        encodeURIComponent(radiusUnit) +
        "&submit=submit+query&CoordList=",
    });
  });

  searchBox2.addEventListener("input", updateCoordState);
  searchBox2.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      searchButton2.click();
    }
  });

  updateCoordState();
});
