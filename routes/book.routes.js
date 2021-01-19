const router = require('express').Router();

router.get('/:id', function(req, res){
    res.send(' GET /book/:id');
});

router.post('/create', function(req,res){
    res.send(' POST /book');
});

// /edit/id .... ret en bog.... POST .. Id

// /delete/id ...  slet en bog ... GET

module.exports = router;