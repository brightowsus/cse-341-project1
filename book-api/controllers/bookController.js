const Book = require('../models/Book');

// GET all books
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST a new book
exports.createBook = async (req, res) => {
  const { title, author, publishedYear, genre, summary } = req.body;

  if (!title || !author) {
    return res.status(400).json({ message: 'Title and author are required.' });
  }

  try {
    const newBook = new Book({ title, author, publishedYear, genre, summary });
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT (update) a book
exports.updateBook = async (req, res) => {
    const { title, author, publishedYear, genre, summary } = req.body;
  
    if (!title || !author) {
      return res.status(400).json({ message: 'Title and author are required.' });
    }
  
    try {
      const updatedBook = await Book.findByIdAndUpdate(req.params.id, { title, author, publishedYear, genre, summary }, { new: true });
      if (!updatedBook) return res.status(404).json({ message: 'Book not found.' });
      res.json(updatedBook);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  
// DELETE a book
exports.deleteBook = async (req, res) => {
  try {
    const deleted = await Book.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Book not found.' });
    res.json({ message: 'Book deleted.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
