const AnimalData = require('../models/animal_data');
const Animal = require('../models/animal');
const {get_level} = require('../game_methods/animal_stats');
const {is_same_day} = require('../helpers');
const {get_base} = require('../game_methods/animal_stats');

const get_animal = async (id) => {
    return await AnimalData.findOne({_id: id}).populate('animal');
}

const get_team = async (id) => {
    return await AnimalData.find({owner_id: id}).populate('animal');
}

const get_teams = () => {
    return async (req,res,next) => {
        const id = req.body.id;
        try
        {
            let team1 = await get_team(req.user._id);
            let team2 = await get_team(id);
            if (team1.length == 0  || team2.length == 0)
                throw new Error('Something went wrong.');
            res.locals.team1 = team1;
            res.locals.team2 = team2;
            next(); 
        }
        catch(err)
        {
            console.log(err);
            return res.status(500).json(err);
        }
    }
}

module.exports = {
    get_animal,
    get_teams
}