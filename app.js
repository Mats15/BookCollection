const http = require('http');
const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const app = express();
const fs = require("fs");
const bookCollection = require('./bookCollection.json')
app.use(express.json());
app.use(express.static("express"));
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
//Get list from json file
app.get('/listBooks', function (req, res) {
    //console.log("server testi "+ req + "   " + res);
    fs.readFile( __dirname + "/" + "bookCollection.json", 'utf8', function (err, data) {
       //console.log( data );
       res.end( data );
    });
 })
//post data to json
 app.post('/listBooks', function (req, res) {
    // console.log( req.body); //pura json objektiksi
    // console.log( req.body.body);
    var newFinalData;
    let reqdata = JSON.parse( req.body.body ); 
    if(reqdata.tag=="new"){
        fs.readFile( __dirname + "/" + "bookCollection.json", 'utf8', function (err, data) {
            
            
            data = JSON.parse( data ); 
            console.log(Object.keys(data.books).length); 
            data['books'].push(
                {
                "id":Date.now(),//ottaa ajan nykyisen ajan millisekunneissa ideksi
                "title":reqdata.title,
                "author":reqdata.author,
                "description":reqdata.description,
                }
                );
            //console.log( data.books );
            newFinalData = data;
            console.log(newFinalData+"sjkldfhklsdhfjsjk");
            fs.writeFileSync(__dirname + "/" + "bookCollection.json", JSON.stringify(newFinalData,null, "\t"));
        });
     
     }
     if(reqdata.tag=="save"){
        fs.readFile( __dirname + "/" + "bookCollection.json", 'utf8', function (err, data) {
        //  console.log( data );
            
            data = JSON.parse( data );
            let modifiedData = {
                "id":reqdata.bookId,
                "title":reqdata.title,
                "author":reqdata.author,
                "description":reqdata.description,
                };
                
            for (let index = 0; index < data.books.length; index++) {
                if(data.books[index].id==reqdata.bookId){
                console.log(data.books[index].id);
                data.books[index]=modifiedData;
                }
            }              
           
          
            newFinalData = data;
            fs.writeFileSync(__dirname + "/" + "bookCollection.json", JSON.stringify(newFinalData,null, "\t"));
        });
        
     }
     if(reqdata.tag=="delete"){
        fs.readFile( __dirname + "/" + "bookCollection.json", 'utf8', function (err, data) {
        //  console.log( data );
            
            data = JSON.parse( data );
            let modifiedData = {
                "id":reqdata.bookId,
                "title":reqdata.title,
                "author":reqdata.author,
                "description":reqdata.description,
                };
                
            for (let index = 0; index < data.books.length; index++) {
                if(data.books[index].id==reqdata.bookId){
                console.log(data.books[index].id);
                data.books[index]=undefined;
                data.books.splice(index,1);
                }
            }              
           
          
            newFinalData = data;
            fs.writeFileSync(__dirname + "/" + "bookCollection.json", JSON.stringify(newFinalData,null, "\t"));
        });
     
     }   
 })
//Get book with id from jso. 
 app.get('/:id', function (req, res) {
    // First read existing users.
    fs.readFile( __dirname + "/" + "bookCollection.json", 'utf8', function (err, data) {
       let books = JSON.parse( data );
       let book = books["book" + req.params.id] 
       console.log( book );
       res.end( JSON.stringify(book));
    });
 })
//default URL for website
app.use('/', function(req,res){
    res.sendFile(path.join(__dirname+'/index.html'));
    //__dirname : It will resolve to your project folder.
  });
const server = http.createServer(app);
const port = 3000;
app.listen(3000,function(){
})
//server.listen(port);