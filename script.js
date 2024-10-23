// Existing library array
const myLibrary = [
    {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        pages: 218,
        isRead: "already read",
    },
    {
        title: "1984",
        author: "George Orwell",
        pages: 328,
        isRead: "not yet read",
    },
    {
        title: "Pride and Prejudice",
        author: "Jane Austen",
        pages: 279,
        isRead: "already read",
    }
];


function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}


function addBookToLibrary(event) {
    event.preventDefault(); // Prevent form submission


    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const readStatus = document.querySelector('input[name="readStatus"]:checked').value;

    // Create a new book object using the constructor
    const newBook = new Book(title, author, pages, readStatus);

    myLibrary.push(newBook);

    console.log(myLibrary);
}


document.getElementById('bookForm').addEventListener('submit', addBookToLibrary);
