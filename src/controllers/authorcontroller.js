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

const listAuthor = async function (req,res){
    let book,author;
    let bookdata = [];
    let authorData=[];
    let saveData = await authorModel.find({age: {$gt:50}}).select({authorId:1,_id:0});
        for(i=0;i<saveData.length;i++){
            book = await bookModel.find({authorId:saveData[i].authorId, ratings: {$gt: 4}}).select({authorId: 1, _id: 0});
                if(book[i]!=undefined){
                bookdata.push(book[i]);
                }
        }
        for(j=0;j<bookdata.length;j++){
            author = await authorModel.find({authorId:bookdata[j].authorId}).select({authorName: 1, _id: 0, age:1});
                authorData.push(author[j]);
        }
    res.send({"author details": authorData});
}

// const getAuthor = async function (req,res) {
//     let bookQuery = await bookModel.find({ratings:{$gt:"4"}}).select({author_id:1, _id:0})
//     let authId = bookQuery.map(inp => inp.author_id)
    
//     let temp = []
//     for(i=0;i<authId.length;i++) {
//         let x = authId[i]
//     let authorQuery = await authorModel.find({ $and: [{author_id : x}, {age: {$gt:"50"}}] }).select({author_name:1, age:1, _id:0})
//     temp.push(authorQuery)
//     }
//     const finalAns = temp.flat()
//     return res.send({data: finalAns})
// }

module.exports.createAuthor = createAuthor
module.exports.getAuthorBooks = getAuthorBooks
module.exports.listAuthor = listAuthor