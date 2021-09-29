var url = "http://localhost:3000/listBooks";
    
    function newItem(){
        let test1 = document.getElementById('Title').value
        console.log(test1)
        let body4 = ({
              body : JSON.stringify({
                title : document.getElementById('Title').value,
                author : document.getElementById('Author').value,
                description : document.getElementById('Description').value,
                bookId : document.getElementById('keyValue').value,
                tag : "new",
              })
            })
            console.log("button clicked");
            var httpRequest = new XMLHttpRequest()
            httpRequest.open('POST', url)
            httpRequest.setRequestHeader('Content-Type', 'application/json')
            httpRequest.send(JSON.stringify(body4))
            httpRequest.onreadystatechange = function () {

            if(httpRequest.readyState == 4 && httpRequest.status == 200) {
            alert(httpRequest.responseText);
            }
          }
      }

      function saveItem(){
        let test1 = document.getElementById('Title').value
        console.log(test1)
        let body4 = ({
              body : JSON.stringify({
                title : document.getElementById('Title').value,
                author : document.getElementById('Author').value,
                description : document.getElementById('Description').value,
                bookId : document.getElementById('keyValue').value,
                tag : "save",
              })
            })
            console.log("button clicked");
            var httpRequest = new XMLHttpRequest()
            httpRequest.open('POST', url)
            httpRequest.setRequestHeader('Content-Type', 'application/json')
            httpRequest.send(JSON.stringify(body4))
            httpRequest.onreadystatechange = function () {

            if(httpRequest.readyState == 4 && httpRequest.status == 200) {
            alert(httpRequest.responseText);
            }
          }
      }

      function deleteItem(){
        let test1 = document.getElementById('Title').value
        console.log(test1)
        let body4 = ({
              body : JSON.stringify({
                title : document.getElementById('Title').value,
                author : document.getElementById('Author').value,
                description : document.getElementById('Description').value,
                bookId : document.getElementById('keyValue').value,
                tag : "delete",
              })
            })
            console.log("button clicked");
            var httpRequest = new XMLHttpRequest()
            httpRequest.open('POST', url)
            httpRequest.setRequestHeader('Content-Type', 'application/json')
            httpRequest.send(JSON.stringify(body4))
            httpRequest.onreadystatechange = function () {

            if(httpRequest.readyState == 4 && httpRequest.status == 200) {
            alert(httpRequest.responseText);
            }
          }
      }

var getJSON = function(url, callback) {
var xhr = new XMLHttpRequest();
xhr.open('GET', url, true);
xhr.responseType = 'json';
xhr.onload = function() {
  var status = xhr.status;
  if (status === 200) {
    callback(null, xhr.response);
  } else {
    callback(status, xhr.response);
  }
};
xhr.send();
}; 

function loadjsontobox(){
  getJSON(url,
        function(err, data) {
          if (err !== null) {
            alert('Something went wrong: ' + err);
          } else {
            let formatedstring ;
            for(var k in data.books) {
              formatedstring += data.books[k].title;
                //alert(data.books[k].id);
                //------------------------------------------------------------
                    let formatedTxt = "Title: "+data.books[k].title + " Author: "+data.books[k].author; //Make the dictionarys text
                    let Storage = document.getElementById('Storage');
                    let para = document.createElement("P"); // Create a <p> element
                    para.innerText = formatedTxt;
                    para.setAttribute("id", data.books[k].id);
                    console.log(data.books[k].id);
                    // recordsObj.a = a;
                    //todo parseid here
                    para.recordsObj = data.books[k];
                    Storage.append(para);
                    para.addEventListener("click", function(event) {
                        loadToTextfield(this.recordsObj);
                        event.preventDefault();
                    });

                    let element = document.getElementById("Storage");
                    let paragraph = document.createElement("p"); //Make space between two books in text box
                    element.appendChild(paragraph);
                    element.setAttribute("class", "StorageBox"); //Makes class the whole box
              
                //------------------------------------------------------------
              }
              
              //end of for loop
            //let formattedData = JSON.parse(data);
            //formattedData.forEach(function(obj) { console.log(obj.id); });
            
            document.getElementById('bookStore').value=formatedstring;
            //alert('Your query count: ' + data.book1.id);
          }
        });
}
loadjsontobox();
function loadToTextfield(recordsObj){
    let title = document.getElementById('Title');
    let author = document.getElementById('Author');
    let description = document.getElementById('Description');
    let key = document.getElementById('keyValue');
    title.value = recordsObj.title;
    author.value = recordsObj.author;
    description.value = recordsObj.description;
    key.value = recordsObj.id;
}