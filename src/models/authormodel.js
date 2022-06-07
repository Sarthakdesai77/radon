const mongoose = require('mongoose');
const { stringify } = require('nodemon/lib/utils');

const authorSchema = new mongoose.Schema({
    authorId:{ 
        type: Number,
        require: true
    },
    authorName:{
        type: String,
        required: true
    },
    age: Number,
    address: String
},{timestamps:true})

module.exports = mongoose.model('Author',authorSchema)