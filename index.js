const axios = require('axios');
const cheerio = require("cheerio");

var express = require("express");
var app = express();
var port = process.env.PORT || 4014;


app.get("/bms/:location/:title/:code", async (req, res, next) => {
    const params=req.params;
    const resp=await checkBooking(params.location,params.title,params.code)
    res.json({"bookingAvailable":!!resp});
});


app.get('/:theatreCode/:title/:location/:locationCode/:movieCode',async(req,res)=>{
    const data=req.params;
    const bookingUrl=`https://in.bookmyshow.com/buytickets/${data.title}-${data.location}/movie-${data.locationCode}-${data.movieCode}-MT`
    const resp=await checkTheaterForBooking(bookingUrl,data.theatreCode);
    res.json({"bookingAvailable":!!resp});
})

async function checkBooking(location,title,code){
    const res=await axios.get(`https://in.bookmyshow.com/${location}/movies/${title}/${code}`)
    .then(function (response) {
        const $ = cheerio.load(response.data, null, false);
        const bookTickets=$("button[data-phase='postRelease']")
        return bookTickets.length;
    })
    .catch(function (error) {
        return false;
    })
  return res;
}

async function checkTheaterForBooking(bookingUrl,theatreCode){
    const res=await axios.get(bookingUrl)
    .then((response)=> {
        const $ = cheerio.load(response.data, null, false);
        const bookTickets=$("a[class='__venue-name']")
      for(let i=0;i<bookTickets.length;i++){
        let tcode=(bookTickets[i].attribs.href.split('/')[3].split('-')[2]);
        if(tcode===theatreCode){
          return true;
        }
      }
      return false;
    })
    .catch(function (error) {
        return false;
    })
  return res;
}


app.listen(port, () => {
    console.log("Server runnning on port " + port);
});