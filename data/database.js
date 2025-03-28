const { MongoClient } = require('mongodb');

let _db;

const initDb = (callback) => {
    if (_db) {
        console.log('Database is already initialized!');
        return callback(null, _db);
    }

    MongoClient.connect('mongodb+srv://mongo:dbUseuse@cluster0.b6l30.mongodb.net/myDatabase')
        .then(client => {
            _db = client.db();
            console.log('Database connected!');
            callback(null, _db);
        })
        .catch(err => {
            callback(err);
        });
};

const getDb = () => {
    if (!_db) {
        throw Error('Database not initialized');
    }
    return _db;
};

module.exports = { initDb, getDb };
