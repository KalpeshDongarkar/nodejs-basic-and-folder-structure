const dbkeys = require('../database/db.keys');
const mongoose = require('mongoose');

await mongoose.connect(dbkeys.mngdbConfig, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const mngdb = mongoose.connection;

var setupMongoDBConnection = () => {
    mngdb.on('connected', () => {
        console.log('Mongoose connected to MongoDB!');
    });

    mngdb.on('error', (err) => {
        console.error('Mongoose connection error:', err);
    });

    mngdb.on('disconnected', () => {
        console.log('Mongoose disconnected from MongoDB.');
    });
}

setupMongoDBConnection()

