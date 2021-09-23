//Load text into localStorage
if(window.localStorage.length === 0){
    var myBooks = [
        {
            "title":"Harry Potter ja viisasten kivi", "author":"J. K. Rowling", "description": "Harry Potter kirjasarjan ensimmäinen osa."
        },
        {
            "title":"Harry Potter ja salaisuuksien kammio", "author":"J. K. Rowling", "description":"Harry Potter kirjasarjan toinen osa"
        },
        {
            "title":"Kalastuksen käsikirja", "author":"Jyrki Jahnukainen", "description":"Kalastuksen opaskirja"
        },
        {
            "title":"Siirtymä", "author":"Rachel Cusk", "description":"Hienovarainen ihmissuhderomaani."
        },
        {
            "title":"Pienen hauen pyydystys", "author":"Juhani Karila", "description":"Vuoden 2019 kotimainen romaani."
        },
        {
            "title":"Suurenmoinen huviretki", "author":"Markku Paasonen", "description":"Vuoden 2019 yllättäjä."
        },
        {
            "title":"Astu matematiikan maailmaan", "author":"Samuli Siltanen", "description":"Vuoden 2019 tietokirja"
        },
        {
            "title":"Ylpeys ja ennakkoluulo", "author":"Jane Austen", "description":"Vuoden 2019 klassikko"
        }  
    ]
    for (var i = 0; i < myBooks.length; i++) { 
        var key = i;
        localStorage.setItem(key, JSON.stringify(myBooks[i]));
    }
}

//Saves books into the localStorage
function store(){ 
    var key = localStorage.length++;
    var title = document.getElementById('Title').value;
    var author = document.getElementById('Author').value;
    var description = document.getElementById('Description').value; 
    
    const book = {
        title: title,
        author: author,
        description: description,
    }
    
    if( title === '' || author === '' || description === '') {
        alert("Use Save New button to add a new book or fill all fields.");
    }
    else {
        window.localStorage.setItem(key,JSON.stringify(book));
        location.reload();
    }
}

//Bring books from localStorage into library field
document.addEventListener("DOMContentLoaded", function(){
    for (var a in window.localStorage) {
        if(window.localStorage.hasOwnProperty(a)){

            var records = window.localStorage[a]; //Searches for the key in localStorage
            var recordsObj = JSON.parse(records);
            var formatedTxt = "Title: "+recordsObj.title + " Author: "+recordsObj.author; //Make the dictionarys text
            var Storage = document.getElementById('Storage');
            var para = document.createElement("P"); // Create a <p> element
            para.innerText = formatedTxt;
            para.setAttribute("id", a);
            recordsObj.a = a;
            para.recordsObj = recordsObj;
            Storage.append(para);
            para.addEventListener("click", function(event) {
                loadToTextfield(this.recordsObj);
                event.preventDefault();
          });

            var element = document.getElementById("Storage");
            var paragraph = document.createElement("p"); //Make space between two books in text box
            element.appendChild(paragraph);
            element.setAttribute("class", "StorageBox"); //Makes class the whole box
        }
     }
     
    
});

//Load data from the storage to the text box
function loadToTextfield(recordsObj){
    var title = document.getElementById('Title');
    var author = document.getElementById('Author');
    var description = document.getElementById('Description');
    var key = document.getElementById('keyValue');
    title.value = recordsObj.title;
    author.value = recordsObj.author;
    description.value = recordsObj.description;
    key.value = recordsObj.a;
}

//Save changed data into localStorage
function saveChanged(recordsObj){
    var key = document.getElementById('keyValue').value;
    var title = document.getElementById('Title').value;
    var author = document.getElementById('Author').value;
    var description = document.getElementById('Description').value;

    const book = {
        title: title,
        author: author,
        description: description,  
    }
    if(key === '' || title === '' || author === '' || description === '') {
        alert("Use Save New button to add a new book or fill all fields.");
    }
    else {
        window.localStorage.setItem(key,JSON.stringify(book));
        location.reload();
    }
}

//Remove item from localStorage and libarary field
function removeItem(){
    var key = document.getElementById('keyValue').value; //gets key from user
    localStorage.removeItem(key) //passes key to the removeItem method
    location.reload();
}

//Ensures the page is loaded before functions are executed
window.onload =function(){ 
    document.getElementById("Submit").onclick = store;
    document.getElementById("deleteButton").onclick = removeItem;
    document.getElementById("Save").onclick = saveChanged;
}