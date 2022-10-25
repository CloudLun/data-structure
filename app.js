const nav = document.querySelector(".nav");
const toggle = document.querySelector(".nav-toggle");

toggle.addEventListener("click", () => {
  const visibility = nav.getAttribute("data-visible");
  if (visibility === "false") {
    nav.setAttribute("data-visible", true);
    toggle.setAttribute("aria-expanded", true);
    console.log("aa");
  } else {
    nav.setAttribute("data-visible", false);
    toggle.setAttribute("aria-expanded", false);
    console.log("bb");
  }
});

let coordinates = [];

d3.json("./data/first.json").then((data) => {
  // console.log(data[0]["OutputGeocodes"][0]["OutputGeocode"]["Latitude"]);
  // console.log(data[0]["OutputGeocodes"][0]["OutputGeocode"]["Longitude"]);
  for (let i = 0; i < data.length; i++) {
    coordinates.push([
      data[i]["OutputGeocodes"][0]["OutputGeocode"]["Latitude"],
      data[i]["OutputGeocodes"][0]["OutputGeocode"]["Longitude"],
    ]);
  }

  // console.log(coordinates)

  let coordinatesData = JSON.stringify(coordinates);
  console.log(coordinatesData);
});

// d3.json("./data/address.json").then((data) => {});
