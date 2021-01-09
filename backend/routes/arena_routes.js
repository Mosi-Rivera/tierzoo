const router = require('express').Router();
const User = require('../models/user');
const AnimalData = require('../models/animal_data');
const { is_logged_in } = require('../middelware/authMiddleware');
const {CombatStatRecorder,simulate_combat} = require('../game_methods/animal_stats');
const BattleRecordSchema = require('../models/battle_record');
const { get_teams } = require('../middelware/animalMiddleware');
const BattleRecord = require('../models/battle_record');

router.get('/get_opponents', is_logged_in(), async (req,res) => {
    try
    {
        let user = await User.find({_id: req.user._id},{'arena.elo': 1});
        let opponents = await User.find({'arena.elo': { $lte: user.arena.elo + 1 }}).sort({'arena.elo': -1}).limit(10);
        let result = [];
        for (let i = opponents.length; i--;)
            result.push(await AnimalData.find({owner_id: opponents[i]._id}));
        return res.status(200).json(result);
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json(err);
    }
})

router.post('/battle', is_logged_in(), get_teams(), async (req,res) => {
    try {
        let enemy_team = res.locals.team2;
        let team = res.locals.team1;

        let battle_record = simulate_combat(team,enemy_team);
        
        return res.status(200).json(await BattleRecordSchema.create(battle_record));
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json(err);
    }
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