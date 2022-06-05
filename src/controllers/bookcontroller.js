const bookModel = require('../models/bookmodel')

const createBook = async function(req,res){
    let data = req.body;
    let saveData = await bookModel.create(data);
    res.send({msg: saveData});
}

const getBook = async function (req,res){
    let allBook = await bookModel.find();
    res.send({msg: allBook});
}

module.exports.createBook=createBook
module.exports.getBook = getBook