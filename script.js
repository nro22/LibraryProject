let myLibrary = [];

function addBookToLibrary(book) {
    myLibrary.push(book);
}

class Book {
    constructor(title, author, pages, read) {
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.read = read;
    }
}
  Book.prototype.info = function(){
    let retStr = this.title + " by " + this.author +", "+this.pages+" pages, ";
    if (this.read){
        retStr+="previously read";
    }else{
        retStr+="not read yet";
    }
    return retStr;
}

//function to style card depending on if user has read the book or not.
function bookStyle(bookVar, bookElement){
    bookElement.innerHTML = `
        <h2>${bookVar.title}</h2>
        <p><span style="color:#a0a0a0">Author:</span> ${bookVar.author}</p>
        <p><span style="color:#a0a0a0">Pages:</span> ${bookVar.pages}</p>
        <div class="read-status">
            <label for="bookRead"><span style="color:#a0a0a0" id="labelText">Read?</span></label>
            <input type="checkbox" class="book-read" name="bookRead" ${bookVar.read ? 'checked' : ''}>
        </div>
    `;
    if (bookVar.read){
        bookElement.style.border = "2px solid #00FF00";
        bookElement.style.boxShadow = "0 2px 50px rgba(0,255,0,0.1)";
    }else{
        bookElement.style.border = "2px solid #800080";
        bookElement.style.boxShadow = "0 2px 50px rgba(128,0,128,0.1)";
    }
}

//Dynamically changes border styling of book cards if user changes checkbox
function checkboxDynamicStyle(bookElement){
    const checkbox = bookElement.querySelector('.book-read');
    checkbox.addEventListener('change', function() {
        console.log("Checkbox changed!");
        if(this.checked){
            bookElement.style.border = "2px solid #00FF00";
            bookElement.style.boxShadow = "0 2px 50px rgba(0,255,0,0.1)";
        }else{
            bookElement.style.border = "2px solid #800080";
            bookElement.style.boxShadow = "0 2px 50px rgba(128,0,128,0.1)";
        }
    });
}

// function to display a single book
function displayBook(bookVar){
    let bookElement = document.createElement('div');
    bookElement.classList.add('book-card');
    bookStyle(bookVar, bookElement);
    checkboxDynamicStyle(bookElement);
    bookContainer.appendChild(bookElement);
}

// loop through the library and display the books
function displayBooks(bookLibrary){
    const bookContainer = document.querySelector('.card-container');
    for (const bookVar of myLibrary){
        displayBook(bookVar);
    }
}
addBookToLibrary(new Book("Atomic Habits", "James Clear", 320, true));  
addBookToLibrary(new Book("The Great Gatsby", "F. Scott Fitzgerald", 180, false));
addBookToLibrary(new Book("To Kill a Mockingbird", "Harper Lee", 281, false));
addBookToLibrary(new Book("1984", "George Orwell", 328, true));
addBookToLibrary(new Book("Pride and Prejudice", "Jane Austen", 279, false));
displayBooks(myLibrary);

//function called to validate title, author, and pages inputted by user
function validate(inputField, flag){
    if (!inputField.value){
        inputField.style.border = "2px solid #FF0000";
        flag=false;
        return;
    }
    inputField.style.border = "1px solid #ccc"; // Reset to default border;
}

function validationStyling(newPages){
    const newTitleElement = document.getElementById("title");
    const newAuthorElement = document.getElementById("author");
    const newPagesElement = document.getElementById("pages");
    let flag = true;
    //validate title and author fields
    validate(newTitleElement, flag);
    validate(newAuthorElement, flag);
    // Validate that pages is a positive number within range
    if (isNaN(newPages) || parseInt(newPages) <= 0 || parseInt(newPages) >= 21500) {
        newPagesElement.style.border = "2px solid #FF0000";
        return false;
    }
    newPagesElement.style.border = "1px solid #ccc"; // Reset to default border;
    return flag;
};
// adds card dynamically when user submits data
let newTitle, newAuthor, newPages, newBoolean;
let addButton = document.querySelector(".addBookButton");
addButton.addEventListener("click" , function(){
    newTitle = document.getElementById("title").value;
    newAuthor = document.getElementById("author").value;
    newPages = document.getElementById("pages").value;

    if (!validationStyling(newPages)){
        return;
    }
        
    // Convert pages to integer
    newPages = parseInt(newPages);

    if (document.getElementById("read").checked){
        newBoolean = true;
    }else{
        newBoolean = false;
    }
    newBook = new Book(newTitle, newAuthor, newPages, newBoolean);
    addBookToLibrary(newBook);
    //display books
    // displayBooks(myLibrary);
    displayBook(newBook);
});