const mongodb = require("../data/database");
const ObjectId = require('mongodb').ObjectId; 

// GET all contacts
const getAll = async (req, res) => {
    try {
        const db = mongodb.getDb();
        const contacts = await db.collection('contacts').find().toArray();
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching contacts', error });
    }
};

// GET a single contact by ID
const getSingle = async (req, res) => {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid ID format' });
    }

    try {
        const db = mongodb.getDb();
        const contact = await db.collection('contacts').findOne({ _id: new ObjectId(id) });

        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching contact', error });
    }
};

// CREATE a new contact
const createUser = async (req, res) => {
    const { firstName, lastName, email, phone, favoriteColor, birthday } = req.body;

    if (!firstName || !lastName || !email || !phone || !favoriteColor || !birthday) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const db = mongodb.getDb();
        const result = await db.collection('contacts').insertOne({ firstName, lastName, email, phone, favoriteColor, birthday });

        if (!result.acknowledged) {
            return res.status(500).json({ message: "Failed to create contact" });
        }

        res.status(201).json({ message: "Contact created successfully", id: result.insertedId });
    } catch (error) {
        res.status(500).json({ message: "Error creating contact", error });
    }
};

// UPDATE a contact by ID
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email, phone, favoriteColor, birthday } = req.body;

    if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }

    try {
        const db = mongodb.getDb();
        const result = await db.collection('contacts').updateOne(
            { _id: new ObjectId(id) },
            { $set: { firstName, lastName, email, phone, favoriteColor, birthday } }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Contact not found" });
        }

        res.status(200).json({ message: "Contact updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating contact", error });
    }

};

// DELETE a contact by ID
const deleteUser = async (req, res) => {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }

    try {
        const db = mongodb.getDb();
        const result = await db.collection('contacts').deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Contact not found" });
        }

        res.status(200).json({ message: "Contact deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting contact", error });
    }
};


module.exports = { getAll, getSingle, createUser, updateUser, deleteUser };
