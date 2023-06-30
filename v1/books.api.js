const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Where we will keep books
let books = [];

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// GET ALL
app.get('/books', (req, res) => {
    res.json(books);
});

// CREATE 
app.post('/books', (req, res) => {
    const book = req.body;
    // Output the book to the console for debugging
    books.push(book);

    res.send('book is added to the database');
});

// GET BY ID
app.get('/books/:isbn', (req, res) => {
    // Reading isbn from the URL
    const isbn = req.params.isbn;

    let book = books.find(b => b.isbn == isbn);
    if(book) {
        res.json(book);
        return;
    }
    res.status(404).send('book not found');
});

// UPDATE BY ID
app.put('/books/:isbn', (req, res) => {
    // Reading isbn from the URL
    const isbn = req.params.isbn;
    const data = req.body;

    let book = books.find(b => b.isbn == isbn);
    if(!book) {
        res.json(book);
        res.status(404).send('book not found');
        return;
    }

    books[books.indexOf(book)] = data;
    res.json(book);
    res.send('book is updated to the database');
});

// DELETE BY ID
app.delete('/books/:isbn', (req, res) => {
    // Reading isbn from the URL
    const isbn = req.params.isbn;
    let book = books.find(b => b.isbn == isbn);

    books.splice( books.indexOf(book) , 1) 
    res.send('book is deleted from the database');
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));