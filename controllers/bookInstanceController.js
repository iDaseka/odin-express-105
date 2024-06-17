const Book = require('../models/book');
const BookInstance = require('../models/bookInstance');
const asyncHandler = require('express-async-handler');
const {body, validationResult} = require('express-validator');

exports.bookInstance_list = asyncHandler(async (req, res, next) => {
    const allBookInstances = await BookInstance.find().populate('book').exec();

    res.render('bookInstance_list', {
        title: 'Book Instance List',
        bookInstance_list: allBookInstances
    })
})

exports.bookInstance_detail = asyncHandler(async (req, res, next) => {
    const bookInstance = await BookInstance.findById(req.params.id).populate('book').exec();

    if (bookInstance === null){
        const err = new Error('Book copy not found');
        err.status = 404;
        return next(err);
    }

    res.render('bookInstance_detail', {
        title: 'Book:',
        bookInstance: bookInstance
    })
})

exports.bookInstance_create_get = asyncHandler(async (req, res, next) => {
    const allBooks = await Book.find({}, 'title').sort({title: 1}).exec();

    res.render('bookInstance_form', {title: 'Create BookInstance', book_list: allBooks});
})

exports.bookInstance_create_post = [
    body('book', 'Book must be specified').trim().isLength({min: 1}).escape(),
    body('imprint', 'Imprint must be specified').trim().isLength({min: 1}).escape(),
    body('status').escape(),
    body('due_back', 'Invalid date').optional({values: 'falsy'}).isISO8601().toDate(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const bookInstance = new BookInstance({
            book: req.body.book,
            imprint: req.body.imprint,
            status: req.body.status,
            due_back: req.body.due_back
        })

        if (!errors.isEmpty()){
            const allBooks = await Book.find({}, 'title').sort({title: 1}).exec();

            res.render('bookInstance_form', {title: 'Create BookInstance', book_list: allBooks, selected_book: bookInstance.book._id, errors: errors.array(), bookInstance: bookInstance});
            return;
        }
        else{
            await bookInstance.save();
            res.redirect(bookInstance.url);
        }
    })
]

exports.bookInstance_delete_get = asyncHandler(async (req, res, next) => {
    const bookInstance = await BookInstance.findById(req.params.id).populate('book').exec();

    if (bookInstance == null){
        res.redirect('/catalog/bookinstances');
    }

    res.render('bookInstance_delete', {
        title: 'Delete BookInstance',
        bookInstance: bookInstance
    })
})

exports.bookInstance_delete_post = asyncHandler(async (req, res, next) => {
    await BookInstance.findByIdAndDelete(req.body.id);
    res.redirect('/catalog/bookinstances');
})

exports.bookInstance_update_get = asyncHandler(async (req, res, next) => {
    const [bookInstance, allBooks] = await Promise.all([BookInstance.findById(req.params.id).populate('book').exec(), Book.find()]);

    if (bookInstance === null){
        const err = new Error('Book copy not found');
        err.status = 404;
        return next(err);
    }

    res.render('bookInstance_form', {
        title: 'Update Book Instance',
        book_list: allBooks,
        selected_book: bookInstance.book._id,
        bookInstance: bookInstance
    })
})

exports.bookInstance_update_post = [
    body('book', 'Book must be specified').trim().isLength({min: 1}).escape(),
    body('imprint', 'Imprint must be specified').trim().isLength({min: 1}).escape(),
    body('status').escape(),
    body('due_back', 'Invalid date').optional({values:'falsy'}).isISO8601().toDate(),


    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        const bookInstance = new BookInstance({
            book: req.body.book,
            imprint: req.body.imprint,
            status: req.body.status,
            due_back: req.body.due_back,
            _id: req.params.id
        })
    
        if (!errors.isEmpty()){
            const allBooks = await Book.find({}, 'title').exec();

            res.render('bookInstance_form', {
                title: 'Update BookInstance',
                book_list: allBooks,
                selected_book: bookInstance.book._id,
                errors: errors.array(),
                bookInstance: bookInstance
            });
            return;
        }
        else{
            await BookInstance.findByIdAndUpdate(req.params.id, bookInstance, {});
            res.redirect(bookInstance.url);
        }
    })
];