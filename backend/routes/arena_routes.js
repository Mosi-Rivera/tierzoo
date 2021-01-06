const router = require('express').Router();
const User = require('../models/user');
const AnimalData = require('../models/animal_data');
const { is_logged_in } = require('../middelware/authMiddleware');
const {CombatStatRecorder,build_team} = require('../game_methods/animal_stats');
const BattleRecordSchema = require('../models/battle_record');
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

router.post('/battle', is_logged_in(), async (req,res) => {
    const id = req.body.id;
    const _id = req.user._id;
    try {
        let enemy_team = await build_team(await AnimalData.find({owner_id: id}));
        let team = await build_team(await AnimalData.find({owner_id: _id}));

        let battle_record = simulate_combat(team,enemy_team);
        
        return res.status(200).json(await BattleRecordSchema.create(battle_record));
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json(err);
    }
})

module.exports = router;