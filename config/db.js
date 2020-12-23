const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI'); //config.get method helps us to get the global variable name mongoURI from the dafault.json file 

const connectDB = async()=>{
    try {
        await mongoose.connect(db,{
            useNewUrlParser: true  //mongoose.connect() returns a deprecation warning and to fix that warning we useNewUrlParser to true.
        })
        console.log('mongodb connected');

    } catch (err) {
        console.error(err.message); //console.log prints to stdout and console.error prints to stderr, but their basic use is same. console.error prints the error more specifically
        process.exit(1);
    }
}

module.exports = connectDB;