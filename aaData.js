const fs = require("fs");

const axios = require("axios");

for (let i = 0; i < 9; i++) {
  axios
    .get(`https://parsons.nyc/aa/m0${i+1}.html`)
    .then((res) => {
      console.log(`statusCode: ${res.status}`);
      console.log(res.data);
      fs.writeFileSync(`./data/m0${i+1}.txt`, res.data);
    })
    .catch((error) => {
      console.error(error);
    });
}


