const mongoose = require('mongoose');
const { stringify } = require('nodemon/lib/utils');

const bookSchema = new mongoose.Schema({
    bookName: {
        type: String,
        required: true
    },
    price: {
        IndianPrice: String,
        EuropeanPrice: String,
    },
    tags: [String],
    year: {
        type: Number,
        default: 2022,
    },
    authorName: String,
    totalPages: Number,
    stockAvailable: Boolean,
}, {timestamps: true});

module.exports = mongoose.model('Book',bookSchema)
