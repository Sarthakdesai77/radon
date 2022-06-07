const authorModel = require('../models/authormodel')
const bookModel = require('../models/bookmodel')

const createAuthor = async function(req,res){
    let data = req.body;
    let saveData = await authorModel.create(data);
    res.send({msg: saveData});
}

const getAuthorBooks = async function (req,res){
    let saveData = await authorModel.find({authorName: "Chetan Bhagat"}).select({authorId:1,_id:0});
    let book = await bookModel.find({authorId:saveData[0].authorId});
    res.send({msg: book});
}


module.exports.createAuthor = createAuthor
module.exports.getAuthorBooks = getAuthorBooks
