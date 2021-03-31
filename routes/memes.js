const express = require('express');
const router = express.Router();
const memesCtrl = require('../controllers/memes');
const isLoggedIn = require('../config/auth');

router.get('/', memesCtrl.index);

// Use isLoggedIn middleware to protect routes below
router.get('/new', isLoggedIn, memesCtrl.new);
router.get('/:id', isLoggedIn, memesCtrl.show);
router.post('/', isLoggedIn, memesCtrl.create);

module.exports = router;