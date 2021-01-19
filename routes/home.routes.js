const router = require('express').Router();

router.get('/', function (req, res) {
    res.render('index', { 
        titel : "Hello World, <em>det er koldt i dag</em>",
        indhold: "indholdet",
        etTal: 123,
    });
}); 

module.exports = router;