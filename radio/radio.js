const radioStations = {
    88.1: 3, 88.7: 8, 88.9: 1, 89.1: 1, 89.3: 10, 89.7: 6, 90.3: 2,
    90.9: 6, 91.3: 1, 91.5: 8, 92.3: 10, 92.5: 6, 92.7: 1, 92.9: 5, 
    93.1: 1, 93.3: 10, 93.5: 1, 94.1: 10, 94.3: 5, 94.5: 8, 94.9: 2, 
    95.1: 3, 95.3: 1, 95.5: 10, 95.7: 3, 96.1: 5, 96.9: 6, 97.3: 6, 
    98.1: 7, 98.5: 8, 99.3: 3, 99.7: 1, 99.9: 10, 100.1: 2, 100.3: 10,
    100.7: 1,101.1: 1, 101.3: 1, 101.5: 10, 101.9: 1, 102.1: 10,  
    102.5: 7, 103.3: 9, 103.7: 10, 104.1: 10, 105.1: 10, 105.3: 1, 
    105.7: 10, 106.3: 10, 106.5: 1, 106.7: 10, 107.9: 8
  }

const radioStationsOutdoor = {
    88.1: 1, 89.3: 7, 89.7: 1, 90.9: 2, 91.5: 7, 92.3: 10, 93.1: 1, 
    93.3: 10, 93.9: 1, 94.1: 10, 94.3: 1, 94.5: 9, 94.9: 4, 95.1: 8,
    95.5: 10, 96.1: 7, 96.9: 1, 97.3: 4, 98.1: 10, 98.5: 3, 99.9: 4,
    100.1: 1, 100.3: 4, 101.3: 1, 102.1: 2, 102.5: 4, 103.3: 5, 103.7: 1,
    104.5: 1, 104.9: 1, 105.1: 10, 106.1: 1, 106.3: 10, 106.5: 1
}




  function copy() {
    let copyText = document.getElementById('table-text');
    let copyButton = document.getElementById('copy-button');
        if (copyText.innerHTML !== ""){
            copyText.select();
            copyText.setSelectionRange(0, 99999);
            document.execCommand("copy");
            copyButton.innerHTML = "copied!"
        }  else {
            copyButton.innerHTML = "submit first"
    }
  }

  function results() {         
      let rows = "";
      let seekVal = [];
      let lightsOn = [];
      const table = document.getElementById("table-text");
      const input = document.querySelectorAll("input.station");
      // const locationInput = document.getElementById("location").value;
      const locationInput = document.getElementById("location-select").value;
      const seek = document.querySelectorAll("input.seek-check")
      const lights = document.querySelectorAll("input.lights-check")
      for (let n = 0; n < lights.length; n++) {
          if (lights[n].checked) {
              lightsOn.push("yes")
          } else {
              lightsOn.push("no");
          } 
      } 
      for (let j = 0; j< seek.length; j++) {
          if (seek[j].checked) {
              seekVal.push("yes")
          } else {
              seekVal.push("no");
          } 
      } 
      for (let i = 0; i < input.length; i++){ 
          let quality = input[i].value;      
          console.log(input.length)
          let station = Object.keys(radioStations)[i];
          let expected = Object.values(radioStations)[i];
          rows += "|=. " + station + " |=. " + expected + " |=. " + quality + " |=. " + seekVal[i] + " |=." + lightsOn[i] + " |" + "&#13;&#10;";     // adds that data to the values
      }
  
      const header = "|_\\5=. " + locationInput + " | " + "&#13;&#10;"
      const columnNames = "|_\\1=. FM Stations |_\\1=. Expected |_\\1=. Rating 1-10 |_\\1=. Seek |_\\1=. Lights On |" + "&#13;&#10;"
      table.innerHTML = header + columnNames + rows 
  } 

  function resultsOutdoor() {         
    let rows = "";
    let seekVal = [];
    let lightsOn = [];
    const table = document.getElementById("table-text");
    const input = document.querySelectorAll("input.station-outdoor");
    // const locationInput = document.getElementById("location").value;
    const locationInput = document.getElementById("location-select").value;
    const seek = document.querySelectorAll("input.seek-check-outdoor")
    const lights = document.querySelectorAll("input.lights-check-outdoor")
    for (let n = 0; n < lights.length; n++) {
        if (lights[n].checked) {
            lightsOn.push("yes")
        } else {
            lightsOn.push("no");
        } 
    } 
    for (let j = 0; j< seek.length; j++) {
        if (seek[j].checked) {
            seekVal.push("yes")
        } else {
            seekVal.push("no");
        } 
    } 
    for (let i = 0; i < input.length; i++){ 
        let quality = input[i].value;                 
        let station = Object.keys(radioStationsOutdoor)[i];
        let expected = Object.values(radioStationsOutdoor)[i];
        rows += "|=. " + station + " |=. " + expected + " |=. " + quality + " |=. " + seekVal[i] + " |=." + lightsOn[i] + " |" + "&#13;&#10;";     // adds that data to the values
    }

    const header = "|_\\5=. " + locationInput + " | " + "&#13;&#10;"
    const columnNames = "|_\\1=. FM Stations |_\\1=. Expected |_\\1=. Rating 1-10 |_\\1=. Seek |_\\1=. Lights On |" + "&#13;&#10;"
    table.innerHTML = header + columnNames + rows 
} 


  function locationSelect() {
    const table = document.getElementById("table-text");
    
    const locationInput = document.getElementById("location-select").value;
      if (locationInput == "outdoor"){
          table.innerHTML = ""
          document.getElementById("input-table-indoor").style.display = "none";
          document.getElementById("input-table-outdoor").style.display = "inline-table";
          console.log("outdoor selected")
      } else {
            table.innerHTML = ""
            document.getElementById("input-table-outdoor").style.display = "none";
            document.getElementById("input-table-indoor").style.display = "inline-table";
          console.log("indoor-selected")
      }
}

        document.getElementById("input-table-outdoor").style.display = "none";
        document.getElementById("input-table-indoor").style.display = "inline-table";

