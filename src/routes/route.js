const express = require('express');

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
    let movieIndex = req.params.indexNumber;
    let finalMovies = "";
    if(movieIndex <movies.length){
    finalMovies = movies[movieIndex];
    }else{
    finalMovies= ("please enter number below "+movies.length);
    }
    res.send(finalMovies);
})

router.get('/films', function(req,res){
    let filmsArray = [ {
        'id': 1,
        'name': 'The Shining'}, 
        {
        'id': 2,
        'name': 'Incendies'}, 
        {
        'id': 3,
        'name': 'Rang de Basanti'}, 
        {
        'id': 4,
        'name': 'Finding Nemo'}
    ]
    res.send(filmsArray);
})

let filmsArray = [ {
    'id': 1,
    'name': 'The Shining'}, 
    {
    'id': 2,
    'name': 'Incendies'}, 
    {
    'id': 3,
    'name': 'Rang de Basanti'}, 
    {
    'id': 4,
    'name': 'Finding Nemo'}
]

router.get('/films/:filmId', function(req,res){
    let filmIndex = req.params.filmId;
    let index,film;
    for(index=0;index<filmsArray.length;index++){
        if(filmsArray[index].id==filmIndex){
            film = (filmsArray[index].name);
        }
    }
    if(filmIndex>=filmsArray.length){
        film = ("index does not exists");
    }
    res.send(film);
})
module.exports = router;
// adding this comment for no reason