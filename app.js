const http = require("http");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const fs = require("fs");
const bookCollection = require("./bookCollection.json");
app.use(express.json());
app.use(express.static("express"));
app.use(bodyParser.json()); // For parsing application/json.
app.use(bodyParser.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded.

//Get list from json file.
app.get("/listBooks", function (req, res) {
  fs.readFile(
    __dirname + "/" + "bookCollection.json",
    "utf8",
    function (err, data) {
      res.end(data);
    }
  );
});
//Post data to json.
app.post("/listBooks", function (req, res) {
  let newFinalData;
  let reqdata = JSON.parse(req.body.body);
  if (reqdata.tag == "new") {
    fs.readFile(
      __dirname + "/" + "bookCollection.json",
      "utf8",
      function (err, data) {
        data = JSON.parse(data);
        data["books"].push({
          id: Date.now(), //Take current time and convert it to milliseconds and make it to id for books.
          title: reqdata.title,
          author: reqdata.author,
          description: reqdata.description,
        });
        newFinalData = data;
        fs.writeFileSync(
          __dirname + "/" + "bookCollection.json",
          JSON.stringify(newFinalData, null, "\t")
        );
      }
    );
  }
  if (reqdata.tag == "save") {
    fs.readFile(
      __dirname + "/" + "bookCollection.json",
      "utf8",
      function (err, data) {
        data = JSON.parse(data);
        let modifiedData = {
          id: reqdata.bookId,
          title: reqdata.title,
          author: reqdata.author,
          description: reqdata.description,
        };

        for (let index = 0; index < data.books.length; index++) {
          if (data.books[index].id == reqdata.bookId) {
            data.books[index] = modifiedData;
          }
        }
        newFinalData = data;
        fs.writeFileSync(
          __dirname + "/" + "bookCollection.json",
          JSON.stringify(newFinalData, null, "\t")
        );
      }
    );
  }
  if (reqdata.tag == "delete") {
    fs.readFile(
      __dirname + "/" + "bookCollection.json",
      "utf8",
      function (err, data) {
        data = JSON.parse(data);
        let modifiedData = {
          id: reqdata.bookId,
          title: reqdata.title,
          author: reqdata.author,
          description: reqdata.description,
        };
        for (let index = 0; index < data.books.length; index++) {
          if (data.books[index].id == reqdata.bookId) {
            data.books[index] = undefined;
            data.books.splice(index, 1);
          }
        }
        newFinalData = data;
        fs.writeFileSync(
          __dirname + "/" + "bookCollection.json",
          JSON.stringify(newFinalData, null, "\t")
        );
      }
    );
  }
});
//Get book with id from jso.
app.get("/:id", function (req, res) {
  // First read existing users.
  fs.readFile(
    __dirname + "/" + "bookCollection.json",
    "utf8",
    function (err, data) {
      let books = JSON.parse(data);
      let book = books["book" + req.params.id];
      res.end(JSON.stringify(book));
    }
  );
});
//Default URL for website.
app.use("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});
const server = http.createServer(app);
const port = 3000;
app.listen(3000, function () {});