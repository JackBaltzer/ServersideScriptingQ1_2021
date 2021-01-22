const Book = require('./models/bookModel');
const {
	v4: uuidv4
} = require('uuid');
const path = require('path');
const fs = require('fs');

async function GetAllBooks() {
	return await Book.find()
		.collation({
			locale: 'da'
		})
		.sort({
			'title': 'asc'
		});
}


module.exports = function (app) {

	app.get('/', async function (req, res) {
		let books = await Book.find();
		res.render('index', {
			books: books
		});
	});

	app.get('/book/:id', function (req, res) {
		res.send(' GET /book/:id');
	});

	app.get('/admin/book', async function (req, res) {



		let books = await GetAllBooks();
		res.render('book', {
			books
		});
	});

	app.post('/admin/book', async function (req, res) {

		if (req.body.isRead != undefined) {
			req.body.isRead = true;
		} else {
			req.body.isRead = false;
		}

		let book = new Book(req.body);
		if (req.files != undefined && req.files.imageName != '') {
			let file = req.files.imageFile;
			let imageName = uuidv4() + path.extname(file.name); // 1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed.jpg
			await file.mv('./public/images/' + imageName);
			book.imageName = imageName;
		}
		book.save();

		res.redirect('/admin/book');

	});

	app.get('/admin/book/edit/:id', async function (req, res) {
		let book = await Book.findById(req.params.id);
		let books = await GetAllBooks();
		res.render('book', {
			book,
			books
		});
	});

	app.post('/admin/book/edit/:id', async function (req, res) {

		// validerings eksempel
		let message = [];

		if (req.body.title == undefined || req.body.title == '') {
			message.push('Udfyld titel');
		}

		if (req.body.pages == undefined || req.body.pages == '') {
			message.push('udfyld antal sider');
		} else if (isNaN(req.body.pages)) {
			message.push('Antal sider skal være et tal');
		}

		// håndter hvis validering fejler
		if (message.length > 0) {
			let books = await GetAllBooks();
			res.render('book', {
				book: req.body,
				books,
				message
			});

			// håndter hvis validering er ok
		} else {
			if (req.body.isRead != undefined) {
				req.body.isRead = true;
			} else {
				req.body.isRead = false;
			}

			// håndter billede..
			if (req.files != undefined && req.files.imageName != '') {
				let book = await Book.findById(req.params.id);
				if (book.imageName != undefined && book.imageName != '') {
					if (fs.existsSync('./public/images/' + book.imageName)) {
						fs.unlinkSync('./public/images/' + book.imageName);
					}
				}
				let file = req.files.imageFile;
				let imageName = uuidv4() + path.extname(file.name);
				await file.mv('./public/images/' + imageName);
				req.body.imageName = imageName;
			}

			await Book.findByIdAndUpdate(req.params.id, req.body);
			res.redirect('/admin/book');
		}
	});

	app.get('/admin/book/delete/:id', async function (req, res) {
		let book = await Book.findById(req.params.id);
		if (book != null) {

			if (book.imageName != undefined && book.imageName != '') {
				if (fs.existsSync('./public/images/' + book.imageName)) {
					fs.unlinkSync('./public/images/' + book.imageName);
				}
			}
			await book.deleteOne();
		}
		res.redirect('/admin/book');
	});
}