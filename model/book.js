
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({});

const Book = mongoose.model('Book', bookSchema,'booksdetails');

module.exports = Book;