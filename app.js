const express = require("express");
const app = express();
app.listen(8080);
app.use(express.json());
const DataRouter = require("./data-router.js");
app.use(new DataRouter().dataRouter);
console.log("Server Started");

const axios = require('axios');

const config = {
  method: 'get',
  url: 'https://holidays.abstractapi.com/v1/?api_key=2235783fa5c648feb693b0afb288b68e&country=IN&year=2020',
  headers: { }
};

axios(config)
.then(function (response) {
  let holidayList = response.data
  const date = new Date()
  const currentDate = new Date((date.getMonth()+1)+"/"+date.getDate()+"/2020")
  let filteredHolidayList = [];
  for(let i=0;i<holidayList.length;i++){
    if(new Date(holidayList[i].date).getTime()>currentDate.getTime()){
        filteredHolidayList.push(holidayList[i])
    }
  }
  const nextHoliday = filteredHolidayList[0]
  console.log("Next holiday from current date",nextHoliday);
})
.catch(function (error) {
  console.log(error);
});



