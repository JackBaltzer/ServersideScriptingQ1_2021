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


	app.get('/admin/book', async function (req, res) {
		let books = await Book.find();
		res.render('book', {
			books
		});
	});


	app.post('/admin/book', function (req, res) {

		if (req.body.isRead != undefined) {
			req.body.isRead = true;
		} else {
			req.body.isRead = false;
		}

		let book = new Book(req.body);
		book.save();

		res.redirect('/admin/book');

	});

	// /book/edit/id .... ret en bog.... POST .. Id

	// /book/delete/id ...  slet en bog ... GET
}