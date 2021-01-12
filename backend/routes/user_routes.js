const express = require('express');
const router = express.Router();
const User = require('../models/user');
const HeroData = require('../models/hero_data');
const {is_logged_in} = require('../middelware/authMiddleware');

router.get('/heros', is_logged_in(), async (req,res) => {
    try
    {
        return res.status(200).json(await HeroData.find({owner_id: req.user._id}).populate('data'));
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json(err);
    }
})

router.get('/team', is_logged_in(), async (req,res) => {
    try
    {
        const _id = req.user._id;
        const team = ( await User.findOne({_id: _id},{team: 1}).populate({path: 'team', populate: {path: 'data'}}) ).team;
        return res.status(200).json(team);
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json(err);
    }
})

router.get('/inventory', is_logged_in(), async (req,res) => {
    try
    {
        const _id = req.user._id;
        return res.status(200).json(( await User.findOne({_id}, {_id: 0, inventory: 1}) ).inventory);
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json(err);
    }
})

module.exports = router;