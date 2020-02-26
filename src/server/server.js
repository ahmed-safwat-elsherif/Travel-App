var path = require('path')
const express = require('express')

const app = express()

app.use(express.static('dist'))

const bodyParser = require('body-parser')
/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

var aylien = require("aylien_textapi");
// set aylien API credentias
var textapi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
  });
console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
const port = 8081;
app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`)
})
let projectData = [];
app.post('/in',(req,res)=>{
    let newData = {
        tripName : req.body.name,
        tripLocation : req.body.location,
        tripDate : req.body.date
    }
    projectData.push(newData);
    res.send(newData)
    console.log(1,projectData)
})
app.get('/test', function(req, res) {
    res.send(projectData)
    console.log(2,projectData)
})

app.post('/photo',(req,res)=>{
    let newData = {
        photo : req.body.photo,
    }
    projectData.push(newData);
    res.send(newData)
    console.log(11,projectData)
})
app.get('/testt', function(req, res) {
    res.send(projectData)
    console.log(22,projectData)
})