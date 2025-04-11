const Author = require("../models/author");



// GET all authors
exports.getAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch authors", error });
  }
};

// POST a new author
exports.createAuthor = async (req, res) => {
  const { name, birthdate, nationality, bio } = req.body;

  if (!name || !birthdate || !nationality || !bio) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const newAuthor = new Author({ name, birthdate, nationality, bio });
    await newAuthor.save();
    res.status(201).json(newAuthor);
  } catch (error) {
    res.status(500).json({ message: "Failed to create author", error });
  }
};


// PUT (update) an author
exports.updateAuthor = async (req, res) => {
  const { name, birthdate, nationality, bio } = req.body;

  if (!name || !birthdate || !nationality || !bio) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const updatedAuthor = await Author.findByIdAndUpdate(req.params.id, { name, birthdate, nationality, bio }, { new: true });
    if (!updatedAuthor) return res.status(404).json({ message: 'Author not found.' });
    res.json(updatedAuthor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE an author
exports.deleteAuthor = async (req, res) => {
  try {
    const deletedAuthor = await Author.findByIdAndDelete(req.params.id);
    if (!deletedAuthor) return res.status(404).json({ message: 'Author not found.' });
    res.json({ message: 'Author deleted.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};