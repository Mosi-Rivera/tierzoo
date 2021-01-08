const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const saltrounds = 12;
const User = require('../models/user');
const {is_logged_in} = require('../middelware/authMiddleware');
const {isAlphaNumeric,validate_password,validate_username} = require('../helpers');

router.post('/signup',async (req,res,next) => {
    const username = req.body.username;
    const password = req.body.password;
    if (!validate_password(password) || !validate_username(username))
        return res.status(500).json({message: 'Invlaid username or password.'});
    try {
        let user = await User.findOne({username});
        if (user)
            return res.status(500).json({message: "Invalid username or password!"});
        let salt = await bcrypt.genSalt(saltrounds);
        let hash = await bcrypt.hash(password,salt);
        await User.create({
            username,
            password: hash,
        });
        next();
    }
    catch(err)
    {
        console.log(err)
        return res.status(500).json(err);
    }
},passport.authenticate('local'),
(req,res) => {
    return res.status(200).json(req.user)
});

router.post('/login',passport.authenticate('local'),(req,res) => {
    return res.status(200).json(req.user);
});

router.get('/delete_account',is_logged_in(),async (req,res) => {
    try {
        await User.findOneAndDelete({_id: req.user._id});
        req.logout();
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json(err);
    }
})

router.get('/is_logged_in',is_logged_in(),(req,res) => {
    return res.status(200).json('user is logged in.');
});

module.exports = router;