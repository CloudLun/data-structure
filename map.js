mapboxgl.accessToken =
  "pk.eyJ1IjoiY2xvdWRsdW4iLCJhIjoiY2s3ZWl4b3V1MDlkejNkb2JpZmtmbHp4ZiJ9.MbJU7PCa2LWBk9mENFkgxw";

const map = new mapboxgl.Map({
  container: "map", // container ID
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: "mapbox://styles/cloudlun/cl8rz4my6001n14tbt2idqfbv", // style URL
  center: [-73.954, 40.786], // starting position [lng, lat]
  zoom: 12.5, // starting zoom
});

function projectPoint(lon, lat) {
  return map.project(new mapboxgl.LngLat(lon, lat));
  //   this.stream.point(point.x, point.y);
}

let transform = d3.geoTransform({ point: projectPoint });
let path = d3.geoPath().projection(transform);
let container = map.getCanvasContainer();

const data = [
  {
    address: {
      location: "Spiritual Renewal Church",
      meeting: "FELLOWSHIP AT NOON - Fellowship At Noon",
      address: "2044 Adam Clayton Powell Blvd",
      ZIP: "1002",
      grayBox: "T If there is a fifth Wednesday",
      wheelChair: "",
    },
    hours: {
      day: "Monday",
      start_time: "12:15 PM",
      end_time: "1:15 PM",
      meeting_type: "S = Step",
      special_interest: "",
    },
    coordinates: {
      x: -73.94991648675322,
      y: 40.80744639481081,
    },
  },
  {
    address: {
      location: "SRO Building Community Room",
      meeting: "K.I.S.S. - Keep It Simple (Kiss)",
      address: "109 West 129th Street, Basement",
      ZIP: "1002",
      grayBox: "All meetings are non-smoking",
      wheelChair: "Wheelchair access",
    },
    hours: {
      day: "Monday",
      start_time: "12:15 PM",
      end_time: "1:15 PM",
      meeting_type: "B = Beginners",
      special_interest: "",
    },
    coordinates: {
      x: -73.94407687341057,
      y: 40.810866143903404,
    },
  },
  {
    address: {
      location: "St. Aloysius School",
      meeting: "RIVERTON - Riverton",
      address: "219 West 132nd Street, Cafeteria",
      ZIP: "1002",
      grayBox:
        "S 2nd &amp; T 4th Tue <br>All meetings are non-smoking.  No children allowed at meetings",
      wheelChair: "",
    },
    hours: {
      day: "Saturday",
      start_time: "6:00 PM",
      end_time: "7:00 PM",
      meeting_type: "O = Open",
      special_interest: "",
    },
    coordinates: {
      x: -73.94587591985459,
      y: 40.81394747917793,
    },
  },
];
d3.json("./data/coordinates.json").then((data) => {
  console.log(data.length);

  let mapContainer = d3
    .select(container)
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .style("position", "absolute")
    .style("z-index", 2);

  let circle = mapContainer
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("id", (d, i) => i)
    .attr("class", (d, i) => i)
    .attr("r", "5")
    .attr("fill", "#b3cbdd");
  // .on('click', (d,i) => {
  //   // let circleID =d3.select(this)["_groups"][0][0].id;
  // })

  function render() {
    circle
      .attr("cx", function (d) {
        return projectPoint(d[1], d[0]).x;
      })
      .attr("cy", function (d) {
        return projectPoint(d[1], d[0]).y;
      });
  }

  map.on("viewreset", render);
  map.on("move", render);
  map.on("moveend", render);
  render();
});

const svg = document.querySelector("svg");
const contentContainer = document.querySelector(".content-container");
let innerHTML = ``;

for (let i = 0; i < data.length; i++) {
  innerHTML += `
  <div class="content content-${i}" id='${i}'>
    <div class="metadata-${i}">${data[i]["hours"]["start_time"]}</div>
    <div class="metadata-${i}">${data[i]["address"]["meeting"]}</div>
    <div class="metadata-${i}">${data[i]["address"]["location"]}</div>
    <div class="metadata-${i}">${data[i]["address"]["address"]}</div>
  </div>
  `;

  contentContainer.innerHTML = innerHTML;
}

// const content = document.querySelectorAll(".content");
// const circles = document.querySelectorAll("circle");
// console.log(circles);

// svg.addEventListener("click", (event) => {
//   target = event.target.id;
//   for (let i = 0; i < content.length; i++) {
//     if (content[i].id === target) {
//       content[i].classList.add("clicked");
//     } else {
//       content[i].classList.remove("clicked");
//     }
//   }

//   for (let i = 0; i < circles.length; i++) {
//     if (circles[i].id === target) {
//       circles[i].attributes["fill"]["nodeValue"] = "#3e5a70";
//     } else {
//       circles[i].attributes["fill"]["nodeValue"] = "#b3cbdd";
//     }
//   }
// });

// contentContainer.addEventListener("click", (event) => {
//   target = event.target;
//   console.log(target.classList[0]);
//   for (let i = 0; i < content.length; i++) {
//     if (
//       target.classList[0] === `metadata-${i}` ||
//       target.classList[0] === `content-${i}`
//     ) {
//       content[i].classList.add("clicked");
//       circles[i].attributes["fill"]["nodeValue"] = "#3e5a70";
//     } else {
//       content[i].classList.remove("clicked");
//       circles[i].attributes["fill"]["nodeValue"] = "#b3cbdd";
//     }
//   }
// });

// search your location*************
