const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
 
const logger = require("morgan");
const HomeRoute = require('./routes/home.routes');
const BookRoute = require('./routes/book.routes');

app.use(logger("dev", {
   // hvis ALLE requests skal ses i loggen, kan næste linje udkommenteres
   skip: req => !req.url.endsWith(".html") && req.url.indexOf(".") > -1
}));

app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/', HomeRoute)
app.use('/book/', BookRoute)

app.use(express.static('public'));

app.listen(port, function(err){
	if(err) console.log(err);
	console.log('Serveren kører! er tilgængelig: http://localhost:' + port);
});