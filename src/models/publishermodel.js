const mongoose = require('mongoose');

const publisherSchema = new mongoose.Schema( {
    publisher_name: String,
    headquaters: String

}, { timestamps: true });

module.exports = mongoose.model('PublisherDB', publisherSchema)
