let aaData = {
  Address: {},
  Hours: [],
};

function parseDataHandler(data, number) {
  let metadata = data.split("</td>");
  let locationList = metadata[0];
  let match;

  // NAME
  let nameHead = locationList.search(';">');
  let nameTail = locationList.search("</h4>");
  let name = locationList.substring(nameHead + 3, nameTail);
  aaData["Address"]["name"] = name;

  //CONTENT
  let contentHead = locationList.search("  <b>");
  let contentTail = locationList.search("</b");
  let content = locationList.substring(contentHead + 5, contentTail);
  aaData["Address"]["content"] = content;

  // ADDRESS
  let reAddress = new RegExp("100", "ig");
  let addressTail = [];
  while ((match = reAddress.exec(data))) {
    addressTail.push(match.index);
  }

  let addressHead = locationList.search("</b><br>");
  let address = locationList.substring(
    addressHead + 15,
    addressTail.length === 1 ? addressTail[0] : addressTail[1]
  );
  aaData["Address"]["address"] = address
    .trim()
    .replace(/\t|\n|br|<|>/g, "")

  // DIRECTION
  let reDirection = new RegExp("<br>", "ig");
  let directionHead = [];
  while ((match = reDirection.exec(data))) {
    directionHead.push(match.index);
  }
  let directionTail = locationList.search(" NY");
  let direction = locationList.substring(directionHead[2] + 4, directionTail);
  aaData["Address"]["content"] = content;

  // ZIP
  let ZIPHead = locationList.search("100");
  let ZIP = locationList.substring(ZIPHead, ZIPHead + 5);
  aaData["Address"]["ZIP"] = ZIP;

  // GRAY BOX
  let boxHead = locationList.search('Box">');
  let boxTail = locationList.search("</div>");
  let box = locationList.substring(boxHead + 15, boxTail - 7);
  aaData["Address"]["grayBox"] = box
    .trim()
    .replace(/\t|\n|br|<|>/g, "")

  // WHEEL CHAIR
  let chairHead = locationList.search("Wheelchair access");
  let chair = locationList.substring(chairHead, chairHead + 17);
  if (chairHead === -1) {
    chair = "";
  }
  aaData["Address"]["wheelChair"] = chair;

  let timeList = metadata[1];
  // DAY
  let reDayHead = new RegExp("				  	    <b>", "ig");
  let dayHead = [];
  while ((match = reDayHead.exec(timeList))) {
    dayHead.push(match.index);
  }

  let reDayTail = new RegExp("s F", "ig");
  let dayTail = [];
  while ((match = reDayTail.exec(timeList))) {
    dayTail.push(match.index);
  }

  let day = [];
  for (let i = 0; i < dayHead.length; i++) {
    day.push(timeList.substring(dayHead[i] + 14, dayTail[i] + 1));
  }

  for (let i = 0; i < day.length; i++) {
    aaData["Hours"].push({});
    aaData["Hours"][i]["day"] = day[i];
  }

  //START TIME
  let reStartTimeHead = new RegExp("m</b>  ", "ig");
  let startTimeHead = [];
  while ((match = reStartTimeHead.exec(timeList))) {
    startTimeHead.push(match.index);
  }

  let reStartTimeTail = new RegExp("<b>to", "ig");
  let startTimeTail = [];
  while ((match = reStartTimeTail.exec(timeList))) {
    startTimeTail.push(match.index);
  }

  let startTime = [];
  for (let i = 0; i < startTimeHead.length; i++) {
    startTime.push(
      timeList.substring(startTimeHead[i] + 7, startTimeTail[i] - 1)
    );
  }

  for (let i = 0; i < startTime.length; i++) {
    aaData["Hours"][i]["start_time"] = startTime[i];
  }

// END TIME
  let reEndTimeHead = new RegExp("<b>to</b>", "ig");
  let endTimeHead = [];
  while ((match = reEndTimeHead.exec(timeList))) {
    endTimeHead.push(match.index);
  }


  let reEndTimeTail = new RegExp("<b>Mee", "ig");
  let endTimeTail = [];
  while ((match = reEndTimeTail.exec(timeList))) {
    endTimeTail.push(match.index);
  }

  let endTime = [];
  for (let i = 0; i < endTimeHead.length; i++) {
    endTime.push(timeList.substring(endTimeHead[i] + 9, endTimeTail[i] - 5));
  }

  for (let i = 0; i < endTime.length; i++) {
    if (endTime.length > 10) {
      endTime = endTime[i].substring(0, 7);
    }
  }

  for (let i = 0; i < endTime.length; i++) {
    aaData["Hours"][i]["end_time"] = endTime[i];
  }

  //   // TYPE
  let retypeHead = new RegExp("Type</b>", "ig");
  let typeHead = [];
  while ((match = retypeHead.exec(timeList))) {
    typeHead.push(match.index);
  }

  let reTypeTail = new RegExp(" meeting", "ig");
  let typeTail = [];
  while ((match = reTypeTail.exec(timeList))) {
    typeTail.push(match.index);
  }

  let type = [];
  for (let i = 0; i < typeHead.length; i++) {
    type.push(timeList.substring(typeHead[i] + 9, typeTail[i]));
  }

  for (let i = 0; i < type.length; i++) {
    aaData["Hours"][i]["meeting_type"] = type[i];
  }

  // // SPECIAL INTEREST
  let interestHead = [];
  let interestTail = [];
  let reinterestHead = new RegExp("Special", "ig");
  let reinterestTail = new RegExp("     <br>", "ig");

  while ((match = reinterestHead.exec(timeList[0]))) {
    interestHead.push(match.index);
  }
  while ((match = reinterestTail.exec(timeList[0]))) {
    interestTail.push(match.index);
  }

  let interest = [];
  for (let i = 0; i < interestHead.length; i++) {
    interest.push(timeList.substring(interestHead[i] + 21, interestTail[i]));
    interest[i] = interest[i].replace("</b>", "").replace("\n", "");
  }

  for (let i = 0; i < day.length; i++) {
    if (interest[0] !== undefined) {
      aaData["Hours"][i]["special interest"] = interest[0];
    } else {
      aaData["Hours"][i]["special_interest"] = "";
    }
  }
}

const fs = require("fs");
const cheerio = require("cheerio");

// load the cheerio object into a variable, `content`
// which holds data and metadata about the html file (written as txt)
var content = fs.readFileSync("data/m01.txt");

// load `content` into a cheerio object
var $ = cheerio.load(content);

let rawData = [];

for (let i = 0; i < 22; i++) {
  rawData[i] = [];
}

$("tr").each(function (i, elem) {
  if ($(elem).attr("style") == "margin-bottom:10px") {
    // console.log($(elem).html());
    // console.log('*************')
    rawData[i - 4] = $(elem).html().replace("\t", "");

  }
});

parseDataHandler(rawData[20])
console.log(aaData);
