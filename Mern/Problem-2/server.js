const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

let bookList = [];

app.get('/api/books', (req, res) => {
  res.json(bookList);
});

app.post('/api/books', (req, res) => {
  const newBook = req.body;
  bookList.push(newBook);
  res.json(newBook);
});

app.delete('/api/books/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  bookList = bookList.filter((book) => book.isbn !== isbn);
  res.json({ message: 'Book deleted successfully' });
});

app.put('/api/books/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  const updatedBook = req.body;
  bookList = bookList.map((book) => (book.isbn === isbn ? updatedBook : book));
  res.json(updatedBook);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
