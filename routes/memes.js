const express = require('express');
const router = express.Router();
const memesCtrl = require('../controllers/memes');
const isLoggedIn = require('../config/auth');

router.get('/', isLoggedIn, memesCtrl.index);

router.get('/all', isLoggedIn, memesCtrl.allMemes )

// Use isLoggedIn middleware to protect routes below
router.get('/new', isLoggedIn, memesCtrl.new);
router.get('/:id', isLoggedIn, memesCtrl.show);
router.post('/', isLoggedIn, memesCtrl.create);

router.delete('/:id', isLoggedIn, memesCtrl.delete)



module.exports = router;