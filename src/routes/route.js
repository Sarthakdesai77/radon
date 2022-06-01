const express = require('express');
const externalModule = require('../logger/logger')
const helperModule = require("../util/helper.js")
const formatterModule = require("../validator/formatter.js")
const router = express.Router();

router.get('/test-me', function (req, res) {
    externalModule.log()
    console.log("todays date (dd/mm) - "+helperModule.dd()+"/"+helperModule.mm())
    helperModule.batchInfo()
    console.log("this is trim - "+formatterModule.trim)
    formatterModule.lower()
    formatterModule.upper()
    res.send('My first ever api!')
});

module.exports = router;
// adding this comment for no reason