// Existing library array
const myLibrary = [
    {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        pages: 218,
        isRead: "already read",
    },
    {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        pages: 281,
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

// Book constructor
function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

// Add toggleReadStatus to the Book prototype
Book.prototype.toggleReadStatus = function() {
    this.isRead = this.isRead === "already read" ? "not yet read" : "already read";
}


function addBookToLibrary(event) {
    event.preventDefault(); 

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const readStatus = document.querySelector('input[name="readStatus"]:checked').value;

    const newBook = new Book(title, author, pages, readStatus);

    myLibrary.push(newBook); 
    displayBooks(); 
}

// Function to display books as cards
function displayBooks() {
    const libraryDiv = document.getElementById('library');
    libraryDiv.innerHTML = ''; // Clear previous content

    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        
        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Status: ${book.isRead}</p>
            <button class="toggle-status" data-index="${index}">Toggle Read Status</button>
            <button class="remove-book" data-index="${index}">Remove Book</button>
        `;

        libraryDiv.appendChild(bookCard);
    });

    // Add event listeners for the buttons
    const removeButtons = document.querySelectorAll('.remove-book');
    const toggleButtons = document.querySelectorAll('.toggle-status');

    removeButtons.forEach(button => {
        button.addEventListener('click', removeBook);
    });

    toggleButtons.forEach(button => {
        button.addEventListener('click', toggleReadStatus);
    });
}

// Function to remove a book from the library
function removeBook(event) {
    const index = event.target.getAttribute('data-index'); // Get index from data-attribute
    myLibrary.splice(index, 1); // Remove the book from the array
    displayBooks(); // Re-render the library
}

// Function to toggle the read status of a book
function toggleReadStatus(event) {
    const index = event.target.getAttribute('data-index'); // Get index from data-attribute
    myLibrary[index].toggleReadStatus(); // Use the prototype method to toggle status
    displayBooks(); // Re-render the library
}


document.getElementById('bookForm').addEventListener('submit', addBookToLibrary);

// Initial display of books
displayBooks();
