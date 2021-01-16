const router = require('express').Router();
const Hero = require('../models/hero_data');
const HeroData = require('../models/hero_data');
const {is_logged_in} = require('../middelware/authMiddleware');
const User = require('../models/user');
const {exponential_growth} = require('../helpers');
const { get_random_hero_index, summon_hero, summon_multiple_heros } = require('../game_methods/summon');
const {HeroStats} = require('../game_methods/classes');
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
        return res.status(200).json(new HeroStats(hero));
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json(err);
    }
});

router.get('/level_up', is_logged_in(), async (req,res) => {
    try
    {
        const id = req.query.id;
        if (!id || typeof id !== 'string')
            throw new Error('Invalid id.');
        let hero = await Hero.findOne({_id: id});
        let inventory = (await User.findOne({_id: req.user._id},{inventory: 1})).inventory;
        let inventory_update = {};
        if (hero.level % 20 == 0)
        {
            let essence = ((hero/20) * 40) * 2.5;
            if (inventory.essence < essence)
                throw new Error('Not enough materials.');
            inventory_update['essence'] = inventory.essence - essence;
        }
        let new_level = Math.min(hero.level + 1, 220); 

        const gold = Math.floor(exponential_growth(23,.6,new_level - 1));
        const exp = Math.floor(exponential_growth(89,.1,new_level - 1));

        if (inventory.gold < gold || inventory.exp < exp)
            throw new Error('Not enough materials.');
        inventory_update['inventory.gold'] = inventory.gold - gold;
        inventory_update['inventory.exp'] = inventory.exp - exp;
        await HeroData.updateOne({_id: id},{level: new_level});
        await User.updateOne({_id: req.user._id},inventory_update);
        return res.status(200).json({message: 'Success!'});
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
        await User.updateOne({_id: req.user._id},{'inventory.gems': inventory.gems - 1});
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

        let summon_arr = await summon_multiple_heros(req.user._id);
        await User.updateOne({_id: req.user._id},{'inventory.gems': inventory.gems - 10});
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
        await User.updateOne({_id: req.user._id},{'inventory.scrolls': inventory.scrolls - 1});
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

        let summon_arr = await summon_multiple_heros(req.user._id);
        console.log(summon_arr);
        await User.updateOne({_id: req.user._id},{'inventory.scrolls': inventory.scrolls - 10});
        return res.status(200).json(summon_arr);
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json(err);
    }
})

module.exports = router;