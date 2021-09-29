let express = require("express");
 //use the application off of express.
let app = express();
const fs = require("fs");
//const URL = "localhost:3000";
app.use(express.json());
app.use(express.static("express"));


 //define the route for "/"
 app.get("/", function (request, response){
     response.sendFile(__dirname+"/index.html");
 });
 //Get user input
 app.get("/getInput", function (request, response){
     let Title = request.query.Title;
     let Author = request.query.Author;
     let Description = request.query.Description;

     if (Title != "") {
         response.send(" Title: " + Title  +" Author: " + Author + " Description: " + Description);
     } else {
         response.send("Please provide us book name");
     }
 });
 //Get list from json file
 app.get('/listBooks', function (req, res) {
    fs.readFile( __dirname + "/" + "bookCollection.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
    });
 })
//Data what is pushed to json file
let book = {
    "book4" : {
        "id" : 4,
        "title" : "title1",
        "authors" : "teacher",
        "description": "aaa"
     }
 }
//Push method to json file.
 app.post('/addBook', function (req, res) {
    // First read existing users.
    fs.readFile( __dirname + "/getInput" + "bookCollection.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       data["book4"] = book["book4"];
       console.log( data );
       res.end( JSON.stringify(data));
    });
 })

 
 //start the server
 app.listen(8080);
 