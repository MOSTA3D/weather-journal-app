// Setup empty JS object to act as endpoint for all routes
let projectData = {};
let data=[];
// Require Express to run server and routes
const express = require("express");

// Start up an instance of app

const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

const cors = require("cors");
app.use(cors());

// Initialize the main project folder

app.use(express.static('website'));

// routes
app.get("/home",(req,res)=>res.send("welcom"));

// /data get route
app.get("/data",(req,res)=>{
    res.send(projectData);
});

// /data post route
app.post("/data",(req,res)=>{
    data.push(req.body);
    projectData = data[data.length-1];
});


// Setup Server
const port = 3000;
app.listen(port,()=>{console.log("SERVER INIT ......")});