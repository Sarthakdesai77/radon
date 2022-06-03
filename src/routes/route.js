const express = require('express');
const myHelper = require('../util/helper')
const underscore = require('underscore')

const router = express.Router();


router.get('/movies', function(req, res){
    let movies = ["Rang de basanti", "The shining", "Lord of the rings", "Batman begins"];
    res.send(movies);
})
router.get('/movies/:indexNumber', function(req, res){
    let movies = ["Rang de basanti", "The shining", "Lord of the rings", "Batman begins"];
    let i = req.params.indexNumber;
    res.send(movies[i]);
})
router.get('/movies/:indexNumber', function(req, res){
    let movies = ["Rang de basanti", "The shining", "Lord of the rings", "Batman begins"];
    let i = req.params.indexNumber;
    if(i <=3){
    res.send(movies[i]);
    }else{
    res.send("index not valid");
    }
})
module.exports = router;
// adding this comment for no reason