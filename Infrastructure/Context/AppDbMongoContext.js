const mongoose = require('mongoose');

const AppDbMongoContext = async() => {

    try {

        await mongoose.connect( process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    
        console.log('Connected to MongoDB');

    } catch (error) {
        console.log(error);
        throw new Error('Error: trying to connect to the database');
    }


}

module.exports = AppDbMongoContext
