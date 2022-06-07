const express = require('express');
const router = express.Router();
const bookcontroller = require("../controllers/bookcontroller")
const authorcontroller = require("../controllers/authorcontroller")

router.get("/test-me", function (req, res) {
    res.send("My first api!")
})

router.post('/createBook',bookcontroller.createBook)

router.post('/createAuthor',authorcontroller.createAuthor)

router.get('/getAuthorBooks',authorcontroller.getAuthorBooks)

router.get('/getBooksAuthor',bookcontroller.getBooksAuthor)

router.get('/bookPrice',bookcontroller.bookPrice)

module.exports = router;