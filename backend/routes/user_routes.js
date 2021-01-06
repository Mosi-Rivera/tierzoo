const express = require('express');
const router = express.Router();
const User = require('../models/user');
const AnimalData = require('../models/animal_data');
const {is_logged_in} = require('../middelware/authMiddleware');

router.get('/',is_logged_in(), async (req,res) => {
    try
    {
        let user = await User.findOne({_id: req.user._id}).select('-password');
        if (user)
            return res.status(200).json(user);
        else throw new Error('Invalid user.');
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json(err);
    }
})

router.get('/team', is_logged_in(), async (req,res) => {
    try {
        let team = await AnimalData.find({owner_id: req.user._id});
        if (team)
            return res.status(200).json({team});
        else throw new Error('Invalid user.');
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json(err);
    }
});

router.get('/inventory', is_logged_in(), async (req,res) => {
    try {
        let user = await User.findOne({_id: req.user._id}, {'_id': 0, 'inventory': 1});
        if (user)
            return res.status(200).json(user);
        else throw new Error('Invalid user.');
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json(err);
    }
})

router.get('/battle_records', is_logged_in(), async (req,res) => {
    try {
        let user = await User.findOne({_id: req.user._id},{'_id': 0,'wild': 1,'arena': 1});
        if (user)
            return res.status(200).json(user);
        else throw new Error('Invalid user.');
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json(err);
    }
})

router.get('/arena_records', is_logged_in(), async (req,res) => {
    try
    {
        let user = await User.findOne({_id: req.user._id},{_id: 0,arena: 1});
        if (user)
            return res.status(200).json(user);
        else throw new Error('Invalid user.');
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json(err);
    }
})

router.get('/wild_records', is_logged_in(), async (req,res) => {
    try
    {
        let user = await User.findOne({_id: req.user._id},{_id: 0,wild: 1});
        if (user)
            return res.status(200).json(user);
        else throw new Error('Invalid user.');
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json(err);
    }
})

router.get('/collect',is_logged_in(), async (req,res) => {
    try
    {
        let user = await user.findOne({_id: req.user._id},{_id: 0, 'idle.last_collect': 1});
        let prizes = get_prizes( Math.floor( ( Date.now() - user.idle.last_collect.getTime() ) / 1000 ) );
        let keys = Object.keys(prizes);
        let update = { 'idle.last_collect': new Date(), $inc: {} };
        for (let i = keys.length; i--;)
        {
            let key = keys[i];
            update.$inc['inventory.' + key] = prizes[key];
        }
        await User.updateOne({_id: req.user._id},update);
        return res.status(200).json({prizes});
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json(err);
    }
})

module.exports = router;