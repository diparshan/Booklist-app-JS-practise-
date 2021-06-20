//Book Class: represents a book
class Book {
  constructor (title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

//UI CLass: Handle UI tasks
class UI {
  static displayBook () {
    const storedBooks = [
      {
        title: 'Book One',
        author: 'Diparshan',
        isbn: '123'
      },
      {
        title: 'Book Two',
        author: 'Diparshan',
        isbn: '123'
      }
    ];

    const books = storedBooks;

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

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const isbn = document.getElementById('isbn').value;

  const book = new Book (title, author, isbn);

  UI.addBookToList(book);
  UI.clearField();
})

//Event: Remove a book
document.querySelector('#book-list').addEventListener('click', (e) => {
  UI.removeBook(e.target);
});