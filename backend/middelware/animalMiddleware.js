const AnimalData = require('../models/animal_data');
const Animal = require('../models/animal');
const {get_level} = require('../game_methods/animal_stats');
const {is_same_day} = require('../helpers');
const {get_base} = require('../game_methods/animal_stats');

const get_animal = () => {
    return async (req,res,next) => {
        const id = req.body.id;
        if (!id)
            return res.status(500).json('No id provided.');
        try
        {
            let data = await AnimalData.findOne({_id: id});
            if (!data) throw new Error('Invalid id.')
            let base = await get_base(data);
            if (base)
            {
                res.locals.data = data;
                res.locals.base = base;
                return next();
            }
            else throw new Error('Animal is dead or db error.');
        }
        catch(err)
        {
            console.log(err);
            return res.status(500).json(err);
        }
    }
}

const get_teams = () => {
    return async (req,res,next) => {
        const id = req.body.id;
        try
        {
            let team_1_data = await AnimalData.find({owner_id: req.user._id});
            let team_2_data = await AnimalData.find({owner_id: id});
            let team_1 = [];
            let team_2 = [];
            for (let i = team_1.length; i--;)
            {
                let data = team_1_data[i];
                let base = await get_base(data);
                if (!base)
                    continue;
                team_1.push([data,base]);
            }
            for (let i = team_2.length; i--;)
            {
                let data = team_2_data;
                let base = await get_base(data);
                if (!base)
                    continue;
                team_2.push([data,base]);
            }
            if (team_1.length == 0  || team_2.length == 0)
                throw new Error('Something went wrong.');
            res.locals.team_1 = team_1;
            res.locals.team_2 = team_2;
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