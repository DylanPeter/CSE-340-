const express = require('express');
const router = express.Router();
const { registerUser, verifyUser } = require('../models/account/index.js');

// GET /account/register - Render registration page
router.get('/register', (req, res) => {
    res.render('account/register');
});

// POST /account/register - Handle registration
router.post('/register', async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;
    
    if (!username || !email || !password || !confirmPassword) {
        return res.redirect('/account/register?error=missing_fields');
    }
    
    if (password !== confirmPassword) {
        return res.redirect('/account/register?error=password_mismatch');
    }
    
    try {
        await registerUser({ username, email, password });
        res.redirect('/account/login?success=registered');
    } catch (error) {
        res.redirect('/account/register?error=registration_failed');
    }
});

// GET /account/login - Render login page
router.get('/login', (req, res) => {
    res.render('account/login');
});

// POST /account/login - Handle login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.redirect('/account/login?error=missing_fields');
    }
    
    try {
        const user = await verifyUser(email, password);
        if (!user) {
            return res.redirect('/account/login?error=invalid_credentials');
        }
        req.session.user = user; // Store user in session
        res.redirect('/account');
    } catch (error) {
        res.redirect('/account/login?error=login_failed');
    }
});

// GET /account - Render account dashboard
router.get('/', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/account/login');
    }
    res.render('account/dashboard', { user: req.session.user });
});

module.exports = router;
