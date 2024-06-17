const express = require('express');
const router = express.Router();

const author_controller = require('../controllers/authorController');
const book_controller = require('../controllers/bookController');
const bookInstance_controller = require('../controllers/bookInstanceController');
const genre_controller = require('../controllers/genreController');

//Author Routes
router.get('/author/create', author_controller.author_create_get);
router.post('/author/create', author_controller.author_create_post);
router.get('/author/:id/delete', author_controller.author_delete_get);
router.post('/author/:id/delete', author_controller.author_delete_post);
router.get('/author/:id/update', author_controller.author_update_get);
router.post('/author/:id/update', author_controller.author_update_post);
router.get('/author/:id', author_controller.author_detail);
router.get('/authors', author_controller.author_list);


//Book Routes
router.get('/', book_controller.index);

router.get('/book/create', book_controller.book_create_get);
router.post('/book/create', book_controller.book_create_post);
router.get('/book/:id/delete', book_controller.book_delete_get);
router.post('/book/:id/delete', book_controller.book_delete_post);
router.get('/book/:id/update', book_controller.book_update_get);
router.post('/book/:id/update', book_controller.book_update_post);
router.get('/book/:id', book_controller.book_detail);
router.get('/books', book_controller.book_list);

//BookInstances Routes
router.get('/bookinstance/create', bookInstance_controller.bookInstance_create_get);
router.post('/bookinstance/create', bookInstance_controller.bookInstance_create_post);
router.get('/bookinstance/:id/delete', bookInstance_controller.bookInstance_delete_get);
router.post('/bookinstance/:id/delete', bookInstance_controller.bookInstance_delete_post);
router.get('/bookinstance/:id/update', bookInstance_controller.bookInstance_update_get);
router.post('/bookinstance/:id/update', bookInstance_controller.bookInstance_update_post);
router.get('/bookinstance/:id', bookInstance_controller.bookInstance_detail);
router.get('/bookinstances', bookInstance_controller.bookInstance_list);

//Genre Routes
router.get('/genres/create', genre_controller.genre_create_get);
router.post('/genres/create', genre_controller.genre_create_post);
router.get('/genres/:id/delete', genre_controller.genre_delete_get);
router.post('/genres/:id/delete', genre_controller.genre_delete_post);
router.get('/genres/:id/update', genre_controller.genre_update_get);
router.post('/genres/:id/update', genre_controller.genre_update_post);
router.get('/genres/:id', genre_controller.genre_detail);
router.get('/genres', genre_controller.genre_list);

module.exports = router;