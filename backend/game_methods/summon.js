const Hero = require('../models/hero');
const HeroData = require('../models/hero_data');

const rare_length = 3;
const elite_length = 3;
const elite_rate = 0.1;

const get_random_hero_index = () => {
    if (Math.random() < elite_rate)
        return 10 + Math.round(Math.random() * (elite_length - 0.9));
    else
        return Math.floor(Math.random() * (rare_length - 1));
}

const summon_hero = async (id) => {
    let hero = await Hero.findOne({hero: get_random_hero_index()});
    if (!hero)
        throw new Error('Something went wrong.');
    return await HeroData.create({
        owner_id: id,
        data: hero._id,
        name: hero.name,
        tier: hero.tier
    });
}

const summon_multiple_heros = async (id) => {
    let arr = [];
    for (let i = 10; i--;)
    {
        let hero = await Hero.findOne({hero: get_random_hero_index()});
        arr.push({
            owner_id: id,
            data: hero._id,
            name: hero.name,
            tier: hero.tier
        });
    }
    return await HeroData.insertMany(arr);
}

module.exports = {
    rare_length,
    elite_length,
    elite_rate,
    summon_hero,
    get_random_hero_index,
    summon_multiple_heros
}