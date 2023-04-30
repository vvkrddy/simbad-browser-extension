document.addEventListener("DOMContentLoaded", function() {

  var searchButton = document.getElementById("search-button1");
  searchButton.addEventListener("click", function() {
    var query = document.getElementById("search-box1").value;
    chrome.tabs.create({url: "http://simbad.cds.unistra.fr/simbad/sim-basic?Ident=" + encodeURIComponent(query) + "&submit=SIMBAD+search"});
  });

  var searchBox = document.getElementById("search-box1");
  searchBox.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      searchButton.click();
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  var radios = document.querySelectorAll('input[type=radio][name=options]');
  var contentDivs = document.querySelectorAll('#content > div');
  
  function showOption(option) {
    for (var i = 0; i < contentDivs.length; i++) {
      if (contentDivs[i].id === option) {
        contentDivs[i].style.display = 'block';
      } else {
        contentDivs[i].style.display = 'none';
      }
    }
  }
  
  showOption('option1');
  
  for (var i = 0; i < radios.length; i++) {
    radios[i].addEventListener('change', function() {
      showOption(this.value);
    });
  }
});

document.addEventListener("DOMContentLoaded", function() {

  var searchButton = document.getElementById("search-button2");
  searchButton.addEventListener("click", function() {
      
    var query = document.getElementById("search-box2").value;
      
    const dropdown1 = document.getElementById("frame");
    const selectedOption1 = dropdown1.options[dropdown1.selectedIndex];
    const frame = selectedOption1.value;
        
    const dropdown2 = document.getElementById("system");
    const selectedOption2 = dropdown2.options[dropdown2.selectedIndex];
    const system = selectedOption2.value;
        
    const dropdown3 = document.getElementById("radius-unit");
    const selectedOption3 = dropdown3.options[dropdown3.selectedIndex];
    const radiusUnit = selectedOption3.value;
        
    var epoch = document.getElementById("epoch").value;

    var equinox = document.getElementById("equinox").value;
        
    var radiusSearch = document.getElementById("radius-search").value;
      
    chrome.tabs.create({url: "http://simbad.cds.unistra.fr/simbad/sim-coo?Coord=" + encodeURIComponent(query).replace(/%20/g, '+') + "&CooFrame=" + encodeURIComponent(system) + "&CooEpoch=" + encodeURIComponent(epoch) + "&CooEqui=" + encodeURIComponent(equinox) + "&CooDefinedFrames=" + encodeURIComponent(frame) + "&Radius=" + encodeURIComponent(radiusSearch) + "&Radius.unit=" + encodeURIComponent(radiusUnit) +"&submit=submit+query&CoordList="});
  });

  var searchBox = document.getElementById("search-box2");
  searchBox.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      searchButton.click();
    }
  });
});