const HeroData = require('../models/hero_data');
const User = require('../models/user');

const get_teams = () => {
    return async (req,res,next) => {
        try
        {
            let user = await User.findOne({_id: req.user._id});
            let other_user = await User.findOne({_id: req.body.id});
            if (!other_user)
                throw new Error('Invalid enemy id.');
            let ally_team = await HeroData.find({_id: { $in: [
                user.team[0],
                user.team[1],
                user.team[2],
                user.team[3],
                user.team[4],
            ]}}).populate('data');
            let enemy_team = await HeroData.find({_id: { $in: [
                other_user.team[0],
                other_user.team[1],
                other_user.team[2],
                other_user.team[3],
                other_user.team[4],
            ]}}).populate('data');
            res.locals = {
                user,
                other_user,
                ally_team,
                enemy_team
            }
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
    get_teams
}