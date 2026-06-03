// Book constructor
function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.id = crypto.randomUUID(); // Generates a unique string ID
}

// Add toggleReadStatus to the Book prototype
Book.prototype.toggleReadStatus = function() {
    this.isRead = this.isRead === "already read" ? "not yet read" : "already read";
}

// Initial library array (Using the constructor so they have the prototype method!)
let myLibrary = [
    new Book("The Great Gatsby", "F. Scott Fitzgerald", 218, "already read"),
    new Book("To Kill a Mockingbird", "Harper Lee", 281, "already read"),
    new Book("1984", "George Orwell", 328, "not yet read"),
    new Book("Pride and Prejudice", "Jane Austen", 279, "already read")
];

function addBookToLibrary(event) {
    event.preventDefault(); 

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const readStatus = document.querySelector('input[name="readStatus"]:checked').value;

    const newBook = new Book(title, author, pages, readStatus);

    myLibrary.push(newBook); 
    displayBooks(); 
    
    document.getElementById('bookForm').reset(); // Clear form
}

// Function to display books as cards
function displayBooks() {
    const libraryDiv = document.getElementById('library');
    libraryDiv.innerHTML = ''; 

    myLibrary.forEach((book) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        
        // CRITICAL: Both buttons MUST use data-id="${book.id}"
        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Status: ${book.isRead}</p>
            <button class="toggle-status" data-id="${book.id}">Toggle Read Status</button>
            <button class="remove-book" data-id="${book.id}">Remove Book</button>
        `; 

        libraryDiv.appendChild(bookCard);
    });

    // Wire up event listeners
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
    const bookId = event.target.dataset.id; 
    myLibrary = myLibrary.filter(book => book.id !== bookId);
    displayBooks(); 
}

// Function to toggle the read status of a book
function toggleReadStatus(event) {
    const bookId = event.target.dataset.id; // Grab data-id from the button
    
    // Find the book object in our array
    const book = myLibrary.find(b => b.id === bookId);
    
    if (book) {
        book.toggleReadStatus(); // Swap status text
        displayBooks();          // Redraw everything
    }
}

// Attach Form Submit Listener
document.getElementById('bookForm').addEventListener('submit', addBookToLibrary);

// Run on page load
displayBooks();
