const mongoose = require('mongoose');
const config = require('config');

const database = config.get('mongoURI');

const connectToDB = async () => {
    try {
        await mongoose.connect(database, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        });
        console.log('database successfully connected ...');
    } catch (err) {
        console.error(err.message);
        // :exit process with failure
        process.exit(1);
    }
}

module.exports = connectToDB;
