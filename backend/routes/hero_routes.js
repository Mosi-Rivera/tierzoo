const router = require('express').Router();
const Hero = require('../models/hero_data');
const mongoose = require('mongoose');
const HeroData = require('../models/hero_data');
const {is_logged_in} = require('../middelware/authMiddleware');
const User = require('../models/user');
const {exponential_growth} = require('../helpers');
const { get_random_hero_index, summon_hero, summon_multiple_heroes } = require('../game_methods/summon');
const {HeroStats} = require('../game_methods/classes');
const { essence_cost, gold_cost, exp_cost } = require('../game_methods/leveling');

router.get('/info', is_logged_in(), async (req,res) => {
    try
    {
        const id = req.query.id;
        console.log(id);
        if (!id || typeof id !== 'string')
            throw new Error('Invalid id.');
        let hero = await HeroData.findOne({_id: id}).populate('data');
        if (!hero)
            throw new Error('Invalid id.');
        return res.status(200).json(new HeroStats(hero,true));
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json(err);
    }
});

router.post('/ascend', is_logged_in(), async (req,res) => {
    const id = req.body.id;
    const fodder = req.body.fodder;
    try
    {
        if (
            fodder.length !== 2 || 
            !mongoose.Types.ObjectId.isValid(fodder[0]) || 
            !mongoose.Types.ObjectId.isValid(1)
        )
            throw new Error("Invalid fodder.");
        if (!mongoose.Types.ObjectId.isValid(id))
            throw new Error("Invalid id");
        let data = await HeroData.find({_id: id},{tier: 1});
        if (!data || data.tier > 2)
            throw new Error("Invalid Id.");
        let data_arr = await HeroData.find({_id: { $in: fodder }, tier: data.tier});
        if (data_arr.length !== 2)
            throw new Error("Invalid fodder");
        await HeroData.updateOne({_id: id}, {$inc: {tier: 1}});
        await HeroData.deleteMany({ _id: { $in: fodder } });
        res.status(200).json({message: 'ok'});
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json(err);
    }
})

router.get('/level_up', is_logged_in(), async (req,res) => {
    try
    {
        const id = req.query.id;
        const levels = Number.parseInt(req.query.levels);
        if (!mongoose.Types.ObjectId.isValid(id) || levels <= 0)
            throw new Error('Invalid id or levels.');
        let hero = await HeroData.findOne({_id: id});
        if (!hero)
            throw new Error('Invalid id.');
        else if (hero.level >= 220)
            throw new Error('Already the highest possible level.');
        let inventory = (await User.findOne({_id: req.user._id},{inventory: 1})).inventory;
        let inventory_update = {
            ['inventory.essence']: 0,
            ['inventory.exp']: 0,
            ['inventory.gold']: 0
        };
        let level = hero.level;
        for (let i = levels,gold,exp,essence; i--;)
        {
            gold = gold_cost(level);
            exp = exp_cost(level);
            essence = essence_cost(level);
            if (
                level >= 100 ||
                inventory.essence   < Math.abs(inventory_update['inventory.essence'])   + essence   ||
                inventory.exp       < Math.abs(inventory_update['inventory.exp'])       + exp       ||
                inventory.gold      < Math.abs(inventory_update['inventory.gold'])      + gold
            ) break;
            inventory_update['inventory.essence']   -= essence;
            inventory_update['inventory.exp']       -= exp;
            inventory_update['inventory.gold']      -= gold;
            level++;
        }
        if (level === hero.level)
            throw new Error('Lacking materials.');
        const result = await HeroData.findByIdAndUpdate(
            id,
            {$inc: { level: level - hero.level }},
            {new: true}
        ).populate('data');
        await User.updateOne({_id: req.user._id},{$inc: inventory_update});
        return res.status(200).json(new HeroStats(result));
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json(err);
    }
});

router.get('/normal_summon_hero_single_gems', is_logged_in(), async (req,res) => {
    try
    {
        const inventory = ( await User.findOne({_id: req.user._id},{_id: 0, inventory: 1}) ).inventory;
        if (inventory.gems < 300)
            throw new Error('Insufficient gems.');
        await User.updateOne({_id: req.user._id},{$inc: { 'inventory.gems': -300 }});
        return res.status(200).json(await summon_hero(req.user._id));
    }
    catch(err)
    {
        console.log(err);
        return res.status(200).json(err);
    }
})

router.get('/normal_summon_hero_multiple_gems', is_logged_in(), async (req,res) => {
    try
    {
        const inventory = ( await User.findOne({_id: req.user._id},{_id: 0, inventory: 1}) ).inventory;
        if (inventory.gems < 2700)
            throw new Error('Insufficient gems.');

        let summon_arr = await summon_multiple_heroes(req.user._id);
        await User.updateOne({_id: req.user._id},{$inc: { 'inventory.gems': -2700 }});
        return res.status(200).json(summon_arr);
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json(err);
    }
})

router.get('/normal_summon_hero_single_scrolls', is_logged_in(), async (req,res) => {
    try
    {
        const inventory = ( await User.findOne({_id: req.user._id},{_id: 0, inventory: 1}) ).inventory;
        if (inventory.scrolls < 1)
            throw new Error('Insufficient scrolls.');
        let result = await summon_hero(req.user._id);
        await User.updateOne({_id: req.user._id},{ $inc: {'inventory.scrolls': -1} });
        return res.status(200).json(result);
    }
    catch(err)
    {
        console.log(err);
        return res.status(200).json(err);
    }
})

router.get('/normal_summon_hero_multiple_scrolls', is_logged_in(), async (req,res) => {
    try
    {
        const inventory = ( await User.findOne({_id: req.user._id},{_id: 0, inventory: 1}) ).inventory;
        if (inventory.scrolls < 10)
            throw new Error('Insufficient scrolls.');

        let summon_arr = await summon_multiple_heroes(req.user._id);
        console.log(summon_arr);
        await User.updateOne({_id: req.user._id},{ $inc: {'inventory.scrolls': -10} });
        return res.status(200).json(summon_arr);
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json(err);
    }
})

module.exports = router;