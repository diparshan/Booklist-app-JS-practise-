//Book Class: represents a book
class Book {
  constructor (title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

//for local storage
class Store {
  static getBooks() {
    let books;

    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  };

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  };

  static removeBook(isbn) {
    const books = Store.getBooks();
    books.forEach((book, index) => {
      if(book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  };
}

//UI CLass: Handle UI tasks
class UI {
  static displayBook () {
    const books = Store.getBooks();

    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList (book) {
    //creating list variable
    const list = document.querySelector('#book-list');

    //creating row element
    const row = document.createElement('tr');

    //inserting data in the row
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;
    
    //adding row to the list
    list.appendChild(row);
  }
  
  //remove book when delete clicked
  static removeBook (e) {
    if (e.classList.contains('delete')) {
      e.parentElement.parentElement.remove();
    }
  }

  //show alert messages
  static showAlert (message, className) {
    //creating div for the alert message box
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    //adding text to the div element
    div.appendChild(document.createTextNode(message));

    //for adding div to the container
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    //adding div before the form element
    container.insertBefore(div, form);

    //vanishing the alert message 
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }

  //to clear the text field
  static clearField () {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
}

//Store Class: Handles Storage


//Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBook);

//Event: Add a book
document.querySelector('#book-form').addEventListener('submit', (e) => {
  e.preventDefault();

  //getting value from the text fields
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const isbn = document.getElementById('isbn').value;

  //validation
  if (title === '' || author === '' || isbn === '') {
    UI.showAlert('Please enter values in all the text fields!', 'danger');
  } else {
    const book = new Book (title, author, isbn);

    //adding book to the UI
    UI.addBookToList(book);
    //adding book to the store
    Store.addBook(book);

    //displaying success message
    UI.showAlert("The book has been successfully added!", 'success');

    //clearing the textfields
    UI.clearField();
  }
})

//Event: Remove a book
document.querySelector('#book-list').addEventListener('click', (e) => {
  //remove book form UI
  UI.removeBook(e.target);
  //remove book from the store
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  //alert message
  UI.showAlert("The book has been successfully removed!", "success");
});