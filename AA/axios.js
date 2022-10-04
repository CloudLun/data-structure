const fs = require('fs');

const axios = require('axios');



axios
  .get('https://parsons.nyc/aa/m01.html')
  .then(res => {
    console.log(`statusCode: ${res.status}`);
    console.log(res.data);
    fs.writeFileSync('./data/m01.txt', res.data);
  })
  .catch(error => {
    console.error(error);
  });

  
  