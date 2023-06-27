const router = require('express').Router();

const isAuthenticated = require('../../middleware/isAuthenticated');

// Static pages
//these are examples
router.get('/', (req, res) => res.render('homepage'));
router.get('/dashboard', (req, res) => res.render('register'));
router.get('/login', (req, res) => res.render('login'));

module.exports = router;
