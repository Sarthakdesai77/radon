const express = require('express');
const myHelper = require('../util/helper')
const underscore = require('underscore')

const router = express.Router();


router.get('/movies', function(req, res){
    let movies = ["Rang de basanti", "The shining", "Lord of the rings", "Batman begins"]
    res.send(movies)
})
router.get('/movies/:indexNumber', function(req, res){
    let movies = ["Rang de basanti", "The shining", "Lord of the rings", "Batman begins"]
    res.send(movies[i])
})

module.exports = router;
// adding this comment for no reason