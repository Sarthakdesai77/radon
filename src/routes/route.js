const express = require('express');
const myHelper = require('../util/helper')
const underscore = require('underscore')

const router = express.Router();

router.get("/sol", function (req, res) {
    let arr= [1,2,3,5,6,7]
    let sumOfArray = 0;
    for(let i=0;i<arr.length;i++){
        sumOfArray+= arr[i]
    }
    console.log(sumOfArray);
    let missingNumber
    let sum = (arr[(arr.length-1)]*(arr.length+2))/2;
    console.log(sum)
    missingNumber = sum-sumOfArray
    console.log(missingNumber);
    res.send(  { data: missingNumber  }  );
});

router.get("/sol1", function (req, res) {
    let arr= [1,2,3,5,6,7]
    let total = 0;
    for (var i in arr) {
        total += arr[i];
    }
    let lastDigit= arr.pop()
    let consecutiveSum= lastDigit * (lastDigit+1) / 2
    let missingNumber= consecutiveSum - total
    res.send(  { data: missingNumber  }  );
});

router.get("/sol2", function (req, res) {
    let arr= [33, 34, 35, 37, 38]
    let len= arr.length
    let total = 0;
    for (var i in arr) {
        total += arr[i];
    }
    let firstDigit= arr[0]
    let lastDigit= arr.pop()
    let consecutiveSum= (len + 1) * (firstDigit+ lastDigit ) / 2
    let missingNumber= consecutiveSum - total
    res.send(  { data: missingNumber  }  );
});



router.get('/candidates', function(req, res){
    console.log('Query paramters for this request are '+JSON.stringify(req.query))
    let gender = req.query.gender
    let state = req.query.state
    let district = req.query.district
    console.log('State is '+state)
    console.log('Gender is '+gender)
    console.log('District is '+district)
    let candidates = ['Akash','Suman']
    res.send(candidates)
})

router.get('/candidates/:canidatesName', function(req, res){
    console.log('The request objects is '+ JSON.stringify(req.params))
    console.log('Candidates name is '+req.params.canidatesName)
    res.send('Done')
})


module.exports = router;
// adding this comment for no reason