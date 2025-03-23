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

module.exports = { getAll, getSingle };
