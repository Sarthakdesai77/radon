const express = require('express');
const router = express.Router();
const bookcontroller = require("../controllers/bookcontroller")

router.get("/test-me", function (req, res) {
    res.send("My first api!")
})

router.post('/creatBook',bookcontroller.createBook)

router.get('/getBookData',bookcontroller.getBook)

module.exports = router;