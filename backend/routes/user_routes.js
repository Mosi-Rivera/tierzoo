const express = require('express');
const router = express.Router();
const User = require('../models/user');
const HeroData = require('../models/hero_data');
const {is_logged_in} = require('../middelware/authMiddleware');
const { json } = require('body-parser');
const { get_rewards } = require('../game_methods/idle');

router.get('/heros', is_logged_in(), async (req,res) => {
    try
    {
        return res.status(200).json(await HeroData.find({owner_id: req.user._id},{name: 1, tier: 1}));
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
        let result = new Array(5);
        const team = ( await User.findOne({_id: _id},{team: 1}).populate({path: 'team', populate: {path: 'data'}}) ).team;
        for (let i = 5; i--;)
            if (team[i]) result[i] = team[i];
            
        return res.status(200).json(result);
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
});

router.get('/collect', is_logged_in(), async (req,res) => {
    try
    {
        let user = await User.findOne({_id: req.user._id});
        let minutes = (Date.now() - user.idle.last_collect.getTime()) / 60000;
        let rewards = get_rewards(minutes,user.arena.elo);
        await User.updateOne({_id: req.user._id},{ $inc: rewards, 'idle.last_collect': new Date() });
        return res.status(200).json(rewards);
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json(err);
    }
})

module.exports = router;