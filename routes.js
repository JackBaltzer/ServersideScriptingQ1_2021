const Book = require('./models/bookModel');





module.exports = (app) => {
	app.get('/', async function (req, res) {


		// let book = new Book();
		// book.title = "Derp";
		// book.author = "Hans";
		// book.pages = 123;
		// book.isRead = false;
		// book.save();

		let books = await Book.find();


		res.render('index', {
			books: books,
			title: "Titel",
			author: "Forfatter",
			pages: 123,
			isRead: false
		});
	});

	app.get('/book/:id', function (req, res) {
		res.send(' GET /book/:id');
	});

	app.post('/book/create', function (req, res) {

		console.log(req.body);

		if (req.body.isRead != undefined) {
			req.body.isRead = true;
		} else {
			req.body.isRead = false;
		}

		res.render('index', {
			title: req.body.title,
			author: req.body.author,
			pages: parseInt(req.body.pages),
			isRead: req.body.isRead
		});

	});

	// /book/edit/id .... ret en bog.... POST .. Id

	// /book/delete/id ...  slet en bog ... GET
}