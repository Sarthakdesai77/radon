const bookModel = require('../models/bookmodel')
const authorModel = require('../models/authormodel')

const createBook = async function(req,res){
    let data = req.body;
    let saveData = await bookModel.create(data);
    res.send({msg: saveData});
}

const getBooksAuthor = async function (req,res){
    let saveData = await bookModel.findOneAndUpdate({name: 'Two states'},{$set: {price: 100}},{new: true});
    let anotherData = await bookModel.find({name: "Two states"}).select({authorId:1,_id:0});
    let book = await authorModel.find({authorId:anotherData[0].authorId});
    res.send({msg: saveData,book});
}

const bookPrice = async function(req,res){
    let saveData = await bookModel.find({price: {$gte:50,$lte:100}});
    res.send({msg: saveData});
}

module.exports.createBook=createBook
module.exports.getBooksAuthor = getBooksAuthor
module.exports.bookPrice = bookPrice
