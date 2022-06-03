const express = require('express');
const myHelper = require('../util/helper')
const underscore = require('underscore')

const router = express.Router();


router.get('/movies', function(req, res){
    let movies = ["Rang de basanti", "The shining", "Lord of the rings", "Batman begins"];
    res.send(movies);
})
//router.get('/movies/:indexNumber', function(req, res){
    //let movies = ["Rang de basanti", "The shining", "Lord of the rings", "Batman begins"];
    //let i = req.params.indexNumber;
    //res.send(movies[i]);
//})
router.get('/movies/:indexNumber', function(req, res){
    let movies = ["Rang de basanti", "The shining", "Lord of the rings", "Batman begins"];
    let movieIndex = req.params.indexNumber;
    let finalMovies = "";
    if(movieIndex <movies.length){
    finalMovies = movies[movieIndex];
    }else{
    finalMovies= ("please enter number below "+movies.length);
    }
    res.send(finalMovies);
})
module.exports = router;
// adding this comment for no reason