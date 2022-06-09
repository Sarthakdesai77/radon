const authorModel = require("../models/authorModel")
const bookModel= require("../models/bookModel")
const publisherModel= require("../models/publishermodel")

const createBook= async function (req, res) {
    let book = req.body;
    let authorid = req.body.author_id;
    let publisherid = req.body.publisher_id
    if(authorid==null || authorid==undefined && publisherid==null || publisherid==undefined){
        return res.send({msg: "Please enter author ID or publisher ID"});
    }
    const getAuthor = await authorModel.findById(authorid);
    if(!getAuthor){
        return res.send({msg: "enter valid author id"});
    }
    const getPublisher = await publisherModel.findById(publisherid);
    if(!getPublisher){
        return res.send({msg: "please enter valid publisher id"});
    }
    let bookCreated = await bookModel.create(book);
    res.send({data: bookCreated});

}

const getBooksData= async function (req, res) {
    let books = await bookModel.find().populate(['author_id','publisher_id']);
    res.send({data: books})
}


module.exports.createBook= createBook
module.exports.getBooksData= getBooksData
