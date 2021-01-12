const router = require('express').Router();
const User = require('../models/user');
const { is_logged_in } = require('../middelware/authMiddleware');
const BattleRecordSchema = require('../models/battle_record');
const { get_teams } = require('../middelware/animalMiddleware');
const BattleRecord = require('../models/battle_record');
const elo = require('../elo');

router.get('/get_opponents', is_logged_in(), async (req,res) => {
    try
    {
        let user = await User.findOne({_id: req.user._id},{'arena.elo': 1});
        console.log(user);
        let opponents = await User.aggregate([
            {$match: { _id: {$ne: user._id} }},
            {$project: {diff: {$abs: {$subtract: [user.arena.elo, '$arena.elo']}}, 'arena.elo': 1 }},
            {$sort: {diff: 1}},
            {$limit: 5}
        ])
        console.log(opponents);
        return res.status(200).json(opponents);
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json(err);
    }
})

router.post('/battle', is_logged_in(), async (req,res) => {
    const id = req.body.id;
    const _id = req.user._id;
    
})

router.get('/match_history', is_logged_in(), async (req,res) => {
    try
    {
        let id = req.user._id;
        return res.status(200).json(await BattleRecord.find({$or: [{'team1.user_id': id}, {'team2.user_id': id}]}).limit(5));
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json(err);
    }
})

module.exports = router;