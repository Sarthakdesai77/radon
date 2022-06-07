const mongoose = require('mongoose');
const { stringify } = require('nodemon/lib/utils');

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    authorId:{ 
        type: Number,
        require: true
    },
    price: Number,
    ratings: Number,
},{timestamps: true});

module.exports = mongoose.model('Book',bookSchema)