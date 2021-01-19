const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
 
const logger = require("morgan");
app.use(logger("dev", {
   // hvis ALLE requests skal ses i loggen, kan næste linje udkommenteres
   skip: req => !req.url.endsWith(".html") && req.url.indexOf(".") > -1
}));

app.set('view engine', 'ejs');
app.set('views', './views');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
   extended: true
}));
app.use(bodyParser.json());


require('./routes.js')(app);

app.use(express.static('public'));

app.listen(port, function(err){
	if(err) console.log(err);
	console.log('Serveren kører! er tilgængelig: http://localhost:' + port);
});