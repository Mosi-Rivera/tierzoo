const AnimalData = require("../models/animal_data");
const Animal = require('../models/animal');
const {get_base, get_level} = require('./animal_stats');
const food_keys = [
    'meat',
    'fish',
    'insects',
    'berries',
    'vegetation',
    'worms',
    'cooked_meat' 
]
const food_keys_len = food_keys.length;

const random_key = () => food_keys[Math.round(Math.random() * (food_keys_len - 1))];

const get_prizes = mult => {
    let result = {};
    for (let i = Math.floor(Math.min(12,mult / 3600) * 3); i--;)
    {
        let key = random_key();
        if (result[key])
            result[key]++;
        else
            result[key] = 1;
    }
    return result;
}

const get_offspring = async id => {
    let animals = await AnimalData.find({owner_id: id});
    let bases = [];
    let offspring_arr = [];
    for (let i = animals.length; i--;)
    {
        let base = await get_base(animals[i]);
        if (base)
            bases.unshift(base);
        else
            animals.splice(i,1);
    }
    for (let i = animals.length; i--;)
    {
        let base = bases[i];
        let animal = animals[i];
        let level = get_level(animal.created_at) + 1;
        if (level > base.fertility.start)
        {
            if (
                level == fertility.end ||
                Math.floor(Math.random() * 100) < ((level - base.fertility.start) + 1) * 10
            ) offspring_arr.push(await create_offspring(animal));
        }
    }
}

module.exports = {
    get_prizes,
    get_offspring
}