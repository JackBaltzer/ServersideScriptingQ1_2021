

module.exports = (app) => {


	app.get('/', function (req, res) {
		res.render('index', { 
			titel : "Hello World, <em>det er koldt i dag</em>",
			indhold: "indholdet",
			etTal: 123,
		});
	}); 

	app.get('/book/:id', function(req, res){
		res.send(' GET /book/:id');
	});
	
	app.post('/book/create', function(req,res){
		res.send(' POST /book');
	});

	// /book/edit/id .... ret en bog.... POST .. Id

	// /book/delete/id ...  slet en bog ... GET
}