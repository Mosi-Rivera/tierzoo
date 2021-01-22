const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const saltrounds = 12;
const User = require('../models/user');
const {is_logged_in} = require('../middelware/authMiddleware');
const {isAlphaNumeric,validate_password,validate_username} = require('../helpers');

class SafeUser
{
    constructor(user)
    {
        this.username = user.username;
        this.team = user.team;
        this._id = user._id;
        this.arena = user.arena;
        this.inventory = user.inventory;
        this.idle = user.idle;
    }
}

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
    return res.status(200).json(new SafeUser(req.user))
});

router.post('/login',passport.authenticate('local'),(req,res) => {
    return res.status(200).json(new SafeUser(req.user));
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

router.get('/is_logged_in',is_logged_in(),async (req,res) => {
    let match = {_id: req.user._id};
    try
    {
        let user = (
            req.query.team ? 
            await User.findOne(match).populate({path: 'team', select: '_id level tier name', options: {retainNullValues: true}}) : 
            await User.findOne(match));
        return res.status(200).json(new SafeUser(user));
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json(err);
    }
});

module.exports = router;