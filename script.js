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

// Function to create a book card
function createBookCard(book) {
    const card = document.createElement('div');
    card.classList.add('book-card');
    card.innerHTML = `
        <h2>${book.title}</h2>
        <p>Author: ${book.author}</p>
        <p>Pages: ${book.pages}</p>
        <p>Read: ${book.read ? 'Yes' : 'No'}</p>
    `;
    return card;
}

// Function to display books
function displayBooks(books) {
    const container = document.getElementById('bookContainer');
    // container.innerHTML = ''; // Clear existing cards
    books.forEach(book => {
        const card = createBookCard(book);
        container.appendChild(card);
    });
}

addBookToLibrary(new Book("The Great Gatsby", "F. Scott Fitzgerald", 180, false));
addBookToLibrary(new Book("To Kill a Mockingbird", "Harper Lee", 281, false));
addBookToLibrary(new Book("1984", "George Orwell", 328, true));
addBookToLibrary(new Book("Pride and Prejudice", "Jane Austen", 279, false));

displayBooks(myLibrary);
