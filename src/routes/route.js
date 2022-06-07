const express = require('express');
const router = express.Router();
const bookcontroller = require("../controllers/bookcontroller")

router.get("/test-me", function (req, res) {
    res.send("My first api!")
})

router.post('/createBook',bookcontroller.createBook)

router.get('/bookList',bookcontroller.bookList)

router.post('/getBooksInYear/:year',bookcontroller.getBooksInYear)

router.post('/getParticularBooks',bookcontroller.getParticularBooks)

router.get('/getXINRBooks',bookcontroller.getXINRBooks)

router.get('/getRandomBooks',bookcontroller.getRandomBooks)

// router.get('/getBookData',bookcontroller.getBook)

module.exports = router;
module.exports = router;