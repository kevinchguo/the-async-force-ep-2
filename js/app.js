//Drop down list

let resourceType = document.getElementById("resourceType");

//Textbox Info

let resourceId = document.getElementById("resourceId");

//Request button

let requestResourceButton = document.getElementById("requestResourceButton");

//content box
let findContentContainer = document.getElementById("contentContainer");
let headerTag2 = document.createElement("h2");
let paragraphTag1 = document.createElement("p");
let paragraphTag2 = document.createElement("p");
let makeFilmUl = document.createElement("ul");

findContentContainer.appendChild(headerTag2);
findContentContainer.appendChild(paragraphTag1);
findContentContainer.appendChild(paragraphTag2);
let swapiAPI = "https://swapi.co/api/";
let apiResource = "people";
let apiId;

//Drop down list
resourceType.addEventListener("change", function() {
  apiResource = resourceType.value;
});

requestResourceButton.addEventListener("click", requestResources);

function requestResources() {
  apiId = "/" + resourceId.value + "/";

  let apiConstructor = swapiAPI + apiResource + apiId;
  const checkReqAPI = new XMLHttpRequest();
  checkReqAPI.addEventListener("load", function() {
    if (this.readyState === 4 && this.status === 200) {
      headerTag2.style.color = "black";
      headerTag2.style.backgroundColor = "white";
      const reqAPI = new XMLHttpRequest();
      reqAPI.addEventListener("load", printAPI);
      reqAPI.open("GET", apiConstructor);
      reqAPI.send();
      function printAPI() {
        let generatedAPI = JSON.parse(this.responseText);

        //Print people API
        if (apiResource === "people") {
          if (makeFilmUl.className === "films") {
            findContentContainer.removeChild(makeFilmUl);
          }
          headerTag2.innerHTML = generatedAPI.name;
          paragraphTag1.innerHTML = "Gender: " + generatedAPI.gender;

          const reqSpecies = new XMLHttpRequest();
          reqSpecies.addEventListener("load", function() {
            let getSpecies = JSON.parse(this.responseText);
            paragraphTag2.innerHTML = "Species: " + getSpecies.name;
          });
          reqSpecies.open("GET", generatedAPI.species);
          reqSpecies.send();

          //Print planets API
        } else if (apiResource === "planets") {
          headerTag2.innerHTML = generatedAPI.name;
          paragraphTag1.innerHTML = "Terrain: " + generatedAPI.terrain;
          paragraphTag2.innerHTML = "Population: " + generatedAPI.population;
          makeFilmUl.className = "films";
          makeFilmUl.innerHTML = "Films";
          findContentContainer.appendChild(makeFilmUl);

          for (
            let allFilms = 0;
            allFilms < generatedAPI.films.length;
            allFilms++
          ) {
            const reqFilms = new XMLHttpRequest();
            reqFilms.addEventListener("load", function() {
              let getFilms = JSON.parse(this.responseText);
              let makeLi = document.createElement("li");
              makeLi.innerHTML = getFilms.title;
              makeFilmUl.appendChild(makeLi);
            });
            reqFilms.open("GET", generatedAPI.films[allFilms]);
            reqFilms.send();
          }

          //Print starships API
        } else if (apiResource === "starships") {
          headerTag2.innerHTML = generatedAPI.name;
          paragraphTag1.innerHTML =
            "Manufacturer: " + generatedAPI.manufacturer;
          paragraphTag2.innerHTML =
            "Starship Class: " + generatedAPI.starship_class;
          makeFilmUl.className = "films";
          makeFilmUl.innerHTML = "Films";
          findContentContainer.appendChild(makeFilmUl);

          for (
            let allFilms = 0;
            allFilms < generatedAPI.films.length;
            allFilms++
          ) {
            const reqFilms = new XMLHttpRequest();
            reqFilms.addEventListener("load", function() {
              let getFilms = JSON.parse(this.responseText);
              let makeLi = document.createElement("li");
              makeLi.innerHTML = getFilms.title;
              makeFilmUl.appendChild(makeLi);
            });
            reqFilms.open("GET", generatedAPI.films[allFilms]);
            reqFilms.send();
          }
        }
      }
    } else {
      let errorMSG = JSON.parse(this.responseText);
      headerTag2.innerHTML =
        "Error " +
        this.status +
        ": Fetching resource: " +
        apiConstructor +
        " (" +
        errorMSG.detail +
        ")";
      headerTag2.style.color = "red";
      headerTag2.style.backgroundColor = "lightpink";
      paragraphTag1.innerHTML = "";
      paragraphTag2.innerHTML = "";
      findContentContainer.removeChild(makeFilmUl);
    }
  });
  checkReqAPI.open("GET", apiConstructor);
  checkReqAPI.send();
}
