const bookModel = require('../models/bookmodel')

const createBook = async function(req,res){
    let data = req.body;
    let saveData = await bookModel.create(data);
    res.send({msg: saveData});
}

const bookList = async function(req,res){
    let list = await bookModel.find().select({bookName:1,authorName:1,_id:0});
    res.send({msg: list});
}

const getBooksInYear = async function(req,res){
    let bookYear = req.params.year;
    let saveData = await bookModel.find({year:bookYear});
    res.send({msg: saveData});
}

const getParticularBooks = async function(req,res){
    let yr = req.params.year;
    let bkname = req.params.bookName;
    let auth = req.params.authorName;
    let page = req.params.totalPages;
    let stock = req.params.stockAvailable;
    let tg = req.params.tags;
    let rs = req.params.price;
    let saveData = await bookModel.find({$or: [{year:yr},{bookName:bkname},{authorName:auth},{totalPages:page},{stockAvailable:stock},{tags:tg},{price:rs}]});
    res.send({msg: saveData});
}

const getXINRBooks = async function(req,res){
    let bookPrice = req.params.IndianPrice;
    let priceData = await bookModel.find({price:{IndianPrice:bookPrice}});
    res.send({msg: priceData});
}

const getRandomBooks = async function(req,res){
    let stockData = await bookModel.find({$or: [{stockAvailable: true},{totalPages:{$gt: 500}}]});
    res.send({msg: stockData});
}
// const getBook = async function (req,res){
//     let allBook = await bookModel.find();
//     res.send({msg: allBook});
// }

module.exports.createBook=createBook
module.exports.bookList = bookList
module.exports.getBooksInYear = getBooksInYear
module.exports.getParticularBooks = getParticularBooks
module.exports.getXINRBooks = getXINRBooks
module.exports.getRandomBooks = getRandomBooks
