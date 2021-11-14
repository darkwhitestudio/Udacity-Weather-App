'use strict';
/* Empty JS object to act as endpoint for all routes */
let projectData = {};

// Requiring all dependencies [express, body-parser, cors]
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// configuring my app to use express
const app = express();

//configuring my app to use body-parser as a middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use cors to let the server and browser communicate without any security issues
app.use(cors());

// telling express where my project folder is
app.use(express.static('website'));

//create a local server [port , callBack function to listen to this port]
const port = process.env.PORT || 8000;
const server = app.listen(port, () =>
  console.log(`server is running and listening to port ${port}`)
);

//post request to postData
app.post('/postData', addData);

function addData(req, res) {
  projectData = {
    date: req.body.date,
    temp: req.body.temp,
    state: req.body.state,
    country: req.body.country,
    feeling: req.body.feeling,
  };
  res.send(projectData);
  console.log(projectData);
}
//get the updated data
app.get('/updateUI', getUpdatedData);

function getUpdatedData(req, res) {
  res.send(projectData);
  console.log(projectData);
}
