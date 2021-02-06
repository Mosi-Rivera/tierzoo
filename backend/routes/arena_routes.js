const router = require('express').Router();
const User = require('../models/user');
const { is_logged_in } = require('../middelware/authMiddleware');
const BattleRecordSchema = require('../models/battle_record');
const BattleRecord = require('../models/battle_record');
const {get_teams} = require('../middelware/heroMiddleware');
const HeroData = require('../models/hero_data');
const elo = require('../elo');
const { simulate_combat } = require('../game_methods/combat');
const get_loot = require('../game_methods/loot');

router.get('/get_opponents', is_logged_in(), async (req,res) => {
    try
    {
        let user = await User.findOne({_id: req.user._id},{'arena.elo': 1});
    
        let opponents = await User.aggregate([
            {$match: { _id: {$ne: user._id} }},
            {$project: {diff: {$abs: {$subtract: [user.arena.elo, '$arena.elo']}}, 'team': 1, 'arena.wins': 1, 'arena.elo': 1, username: 1 }},
            {$sort: {diff: 1}},
            {$limit: 10},
        ]);

        opponents = await User.populate(opponents,{path: 'team', select: 'name tier level'});
        return res.status(200).json(opponents);
    }
    catch(err)
    {
        return res.status(500).json(err);
    }
});

router.get('/remove_team_position', is_logged_in(), async (req,res) => {
    const position = Number.parseInt(req.query.position);
    try
    {
        if (position < 0 || position >= 5)
            throw new Error('Invalid position');
        if (typeof position !== 'number')
            throw new Error('Invalid position.');
        await User.updateOne({_id: req.user._id},{['team.' + position]: null});
        res.status(200).json();
    }
    catch(err)
    {
        return res.status(500).json(err);
    }
})

router.post('/set_team_position', is_logged_in(), async (req,res) => {
    let id = req.body.id;
    let position = req.body.position;
    try
    {
        if (await User.findOne({_id: req.user._id,'team': id}))
            throw new Error('Hero already in use.');
        if (position < 0 && position >= 5)
            throw new Error('Invalid position.');
        let data = await HeroData.findOne({_id: id, owner_id: req.user._id},{level: 1,name: 1});
        if (!data)
            throw new Error('Invalid id.');
        await User.updateOne({_id: req.user._id},{
            ['team.' + position]: data._id
        });
        return res.status(200).json(data);
    }
    catch(err)
    {
        return res.status(500).json(err);
    }
});

router.post('/battle', is_logged_in(), get_teams(), async (req,res) => {
    try
    {
        let user = res.locals.user;
        let other_user = res.locals.other_user;
        let resolve = elo(user.arena.elo,other_user.arena.elo);
        let result = simulate_combat(res.locals.ally_team,res.locals.enemy_team);
        let new_elo = result.winner == 0 ? resolve(1,0) : resolve(0,1);
        let loot = get_loot(user.arena,result.winner == 0);
        const update_self = {$inc: {'arena.elo': new_elo.a.difference}};
        const update_other = {$inc: {'arena.elo': new_elo.b.difference}};
        if (result.winner == 0)
        {
            update_other.$inc['arena.losses'] = update_self.$inc['arena.wins'] = 1;
            update_self.$inc['inventory.gems'] = loot;
        }
        else
            update_other.$inc['arena.wins'] = update_self.$inc['arena.losses'] = 1;
        if (user.arena.elo + new_elo.a.difference > user.arena.elo_pr)
            update_self['arena.elo_pr'] = user.arena.elo + new_elo.a.difference;
        if (other_user.arena.elo + new_elo.b.difference > other_user.arena.elo_pr)
            update_other['arena.elo_pr'] = user.arena.elo + new_elo.b.difference;
        await User.updateOne({ _id: req.user._id },update_self,{new: true});
        await User.updateOne({ _id: req.body.id  },update_other);
        user.arena.elo += new_elo.a.difference;
        return res.status(200).json({
            elo: user.arena.elo,
            difference: new_elo.a.difference,
            record: result.record,
            rounds: result.rounds,
            winner: result.winner,
            loot: loot || null
        });
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json(err);
    } 
});

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
});

module.exports = router;