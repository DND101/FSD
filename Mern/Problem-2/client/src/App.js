import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';
const LibraryManagementSystem = () => {
  const backendUrl = 'http://localhost:5000/api/books';

  const [bookList, setBookList] = useState([]);
  const [formData, setFormData] = useState({
    bookName: '',
    isbn: '',
    bookTitle: '',
    authorName: '',
    publisherName: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const fetchBookList = async () => {
    try {
      const response = await axios.get(backendUrl);
      setBookList(response.data);
    } catch (error) {
      console.error('Error fetching book list:', error);
    }
  };

  const handleInsert = async () => {
    try {
      await axios.post(backendUrl, formData);
      fetchBookList();
      setFormData({
        bookName: '',
        isbn: '',
        bookTitle: '',
        authorName: '',
        publisherName: '',
      });
    } catch (error) {
      console.error('Error inserting book:', error);
    }
  };

  const handleDelete = async (isbn) => {
    try {
      await axios.delete(`${backendUrl}/${isbn}`);
      fetchBookList();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const handleUpdate = async (isbn) => {
    // Implement update logic here based on ISBN
    // You can open a modal or navigate to another page for updating
    console.log('Update book with ISBN:', isbn);
  };

  useEffect(() => {
    fetchBookList();
  }, []);

  return (
    <div>
      <h1>Library Management System</h1>
      <div>
        <h2>Add Book</h2>
        <form>
          <label>
            Book Name:
            <input type="text" name="bookName" value={formData.bookName} onChange={handleInputChange} />
          </label>
          <br />
          <label>
            ISBN No:
            <input type="text" name="isbn" value={formData.isbn} onChange={handleInputChange} />
          </label>
          <br />
          <label>
            Book Title:
            <input type="text" name="bookTitle" value={formData.bookTitle} onChange={handleInputChange} />
          </label>
          <br />
          <label>
            Author Name:
            <input type="text" name="authorName" value={formData.authorName} onChange={handleInputChange} />
          </label>
          <br />
          <label>
            Publisher Name:
            <input type="text" name="publisherName" value={formData.publisherName} onChange={handleInputChange} />
          </label>
          <br />
          <button type="button" onClick={handleInsert}>
            Add Book
          </button>
        </form>
      </div>

      <div>
        <h2>Book List</h2>
        <table>
          <thead>
            <tr>
              <th>Book Name</th>
              <th>ISBN No</th>
              <th>Book Title</th>
              <th>Author Name</th>
              <th>Publisher Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookList.map((book) => (
              <tr key={book.isbn}>
                <td>{book.bookName}</td>
                <td>{book.isbn}</td>
                <td>{book.bookTitle}</td>
                <td>{book.authorName}</td>
                <td>{book.publisherName}</td>
                <td>
                  <button onClick={() => handleUpdate(book.isbn)}>Update</button>
                  <button onClick={() => handleDelete(book.isbn)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LibraryManagementSystem;
