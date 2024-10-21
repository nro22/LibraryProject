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
function bookStyle(bookVar, bookElement){
    if (bookVar.read){
        bookElement.style.border = "2px solid #00FF00";
        bookElement.style.boxShadow = "0 2px 50px rgba(0,255,0,0.1)";
    }else{
        bookElement.style.border = "2px solid #800080";
        bookElement.style.boxShadow = "0 2px 50px rgba(128,0,128,0.1)";
    }
}
function displayBook(bookVar){
    let bookElement = document.createElement('div');
    bookElement.classList.add('book-card');
    bookElement.innerHTML = `
        <h2>${bookVar.title}</h2>
        <p>Author: ${bookVar.author}</p>
        <p>Pages: ${bookVar.pages}</p>
        <div class="read-status">
            <label for="bookRead">Read:</label>
            <input type="checkbox" id="bookRead" name="bookRead" ${bookVar.read ? 'checked' : ''}>
        </div>
        `;
        bookStyle(bookVar, bookElement);
        bookContainer.appendChild(bookElement);
}
// loop through the library and display the books
function displayBooks(bookLibrary){
    const bookContainer = document.querySelector('.card-container');
    for (const bookVar of myLibrary){
        let bookElement = document.createElement('div');
        bookElement.classList.add('book-card');
        bookElement.innerHTML = `
            <h2>${bookVar.title}</h2>
            <p>Author: ${bookVar.author}</p>
            <p>Pages: ${bookVar.pages}</p>
            <div class="read-status">
                <label for="bookRead">previously-read:</label>
                <input type="checkbox" id="bookRead" name="bookRead" ${bookVar.read ? 'checked' : ''}>
            </div>
        `;
        bookStyle(bookVar, bookElement);
        bookContainer.appendChild(bookElement);
    }
}
addBookToLibrary(new Book("Atomic Habits", "James Clear", 320, true));  
addBookToLibrary(new Book("The Great Gatsby", "F. Scott Fitzgerald", 180, false));
addBookToLibrary(new Book("To Kill a Mockingbird", "Harper Lee", 281, false));
addBookToLibrary(new Book("1984", "George Orwell", 328, true));
addBookToLibrary(new Book("Pride and Prejudice", "Jane Austen", 279, false));
displayBooks(myLibrary);

//function to change CSS when user toggles "read" checkbox
let toggleButtons = document.querySelectorAll("#bookRead");
toggleButtons.forEach(toggleButton => {
    toggleButton.addEventListener("change", function(){
        let bookCard = this.closest(".book-card");
        if(this.checked){
            bookCard.style.border = "2px solid #00FF00";
            bookCard.style.boxShadow = "0 2px 50px rgba(0,255,0,0.1)";
        }else{
            bookCard.style.border = "2px solid #800080";
            bookCard.style.boxShadow = "0 2px 50px rgba(128,0,128,0.1)";
        }
    });
});

//need to verify all fields inputted
let newTitle, newAuthor, newPages, newBoolean;
let addButton = document.querySelector(".addBookButton");
addButton.addEventListener("click" , function(){
    //add book to library
    newTitle = document.getElementById("title").value;
    newAuthor = document.getElementById("author").value;
    newPages = document.getElementById("pages").value;
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