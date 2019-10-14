window.addEventListener("load", function() {
   let button = document.getElementById("formSubmit");
   button.addEventListener("click", function(event){
      let pilotName = document.getElementsByName("pilotName")[0].value;
      let copilotName = document.getElementsByName("copilotName")[0].value;
      let fuelLevel = document.getElementsByName("fuelLevel")[0].value;
      let cargoWeight = document.getElementsByName("cargoWeight")[0].value;
      let listItems = document.getElementsByTagName("LI");
      let faultyDiv = document.getElementById("faultyItems");
      let launchStatus = document.getElementById("launchStatus");
      let missionTarget = document.getElementById("missionTarget");
      if (!pilotName || !copilotName || !fuelLevel || !cargoWeight) {
         alert("Please fill out all fields");
      }
      else if (!isNaN(pilotName) || !isNaN(copilotName) || isNaN(fuelLevel) || isNaN(cargoWeight)) {
         alert("Please enter valid information in each field");
      } else {
         fuelLevel = Number(fuelLevel);
         cargoWeight = Number(cargoWeight);
         listItems[0].innerHTML = `Pilot ${pilotName} is ready`;
         listItems[1].innerHTML = `Co-pilot ${copilotName} is ready`;
         if (fuelLevel < 10000 || cargoWeight > 10000) {
            faultyDiv.style.visibility = "visible";
            missionTarget.innerHTML = ``;
            launchStatus.innerHTML = `Shuttle Not Ready for Launch`;
            launchStatus.style.color = "red";
            if (fuelLevel < 10000) {
               listItems[2].innerHTML = `Fuel level too low for launch`;
            } else if (fuelLevel >= 10000) {
               listItems[2].innerHTML = `Fuel level high enough for laucnh`;
            }
            if (cargoWeight > 10000) {
               listItems[3].innerHTML = `Cargo mass too large to launch`;
            } else if (cargoWeight <= 10000) {
               listItems[3].innerHTML = `Cargo mass low enough to launch`;
            }
         }
         else {
            launchStatus.innerHTML = `Shuttle is Ready for Launch`;
            launchStatus.style.color = "green";
            faultyDiv.style.visibility = "hidden";
            fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
               response.json().then(function(json) {
                  // Pick a random destination
                  let p = Math.floor(Math.random()*json.length);
                  missionTarget.innerHTML = `
                  <h2>Mission Destination</h2>
                  <ol>
                     <li>Name: ${json[p].name}</li>
                     <li>Diameter: ${json[p].diameter}</li>
                     <li>Star: ${json[p].star}</li>
                     <li>Distance from Earth: ${json[p].distance}</li>
                     <li>Number of Moons: ${json[p].moons}</li>
                  </ol>
                  <img src="${json[p].image}">
                  `
               });
            });
         }
      } 
      event.preventDefault();
   });
});