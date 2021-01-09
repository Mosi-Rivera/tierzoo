const Animal = require("../models/animal");
const AnimalData = require('../models/animal_data');
const Offspring = require('../models/offspring');
const {is_same_day} = require('../helpers');
const abilities = require('./abilities');
class Stats
{
    health = 0;
    attack = 0;
    defence = 0;
    stealth = 0;
    intelligence = 0;
    mobility = 0;
}

class AnimalCombatStats
{
    constructor(data)
    {
        this.species    = data.animal.species;
        this.dealt      = 0;
        this.healing    = 0;
        this.healed     = 0;
        this.taken      = 0;
    }
}

class CombatStatRecorder
{
    constructor(team1,team2)
    {
        this.winner = null;
        this.rounds = 0;
        this.team1 = {user_id: team1[0].owner_id, animals: []};
        this.team2 = {user_id: team2[0].owner_id, animals: []};
        for (let i = team1.length; i--;)
            this.team1.animals[i] = new AnimalCombatStats(team1[i]);
        for (let i = team2.length; i--;)
            this.team2.animals[i] = new AnimalCombatStats(team2[i]);    
    }
}

class FS_Animal
{
    stats = new Stats();
    constructor(data)
    {
        let base = data.animal;
        let diet = base.diet;
        let protein = Math.floor(data.protein / diet.protein) * 100;
        let carbs = Math.floor(data.carbs / diet.carbs) * 100;
        let fat = Math.floor(data.fat / diet.fat) * 100;
        let protein_mod = FS_Animal.get_nutrient_mod(protein);
        let carb_mod    = FS_Animal.get_nutrient_mod(carbs);
        let fat_mod     = FS_Animal.get_nutrient_mod(fat);
        let curve       = base.level.curve;
        let death       = base.level.death;
        let fertility   = base.fertility;
        let level_raw   = get_level(data.created_at);
        let level;
        if (level_raw < curve)
            level = Math.floor((level_raw / curve) * 100) + 1;
        else
            level = Math.floor(100 - ( ( ( level_raw - curve ) / curve ) * 100)) + 1
        level_raw += 1;
        
        this.stats.health       = FS_Animal.calculate_stat(data,base,level,fat_mod,'health');
        this.stats.attack       = FS_Animal.calculate_stat(data,base,level,(carb_mod + protein_mod) / 2,'attack');
        this.stats.defence      = FS_Animal.calculate_stat(data,base,level,(protein_mod + fat_mod) / 2,'defence');
        this.stats.intelligence = FS_Animal.calculate_stat(data,base,level,carb_mod,'intelligence');
        this.stats.stealth      = FS_Animal.calculate_stat(data,base,level,1,'stealth');
        this.stats.mobility     = FS_Animal.calculate_stat(data,base,level,(carb_mod + protein_mod + fat_mod) / 3,'mobility');
        this.gv                 = data.gv;
        this.can_reproduce = level_raw >= fertility.min && level_raw <= fertility.max;

        this.owner_id   = data.owner_id;
        this.species    = base.species;
        this.old_age    = level_raw >= death.min;
        this.declining  = level_raw > curve;
        this.level      = level;
        this.protein    = protein;
        this.carbs      = carbs;
        this.fat        = fat;
    }
    static get_nutrient_mod(nutrient)
    {
        return nutrient <= 90 ? (nutrient / 90): (nutrient >= 110 ? 1 - (Math.min(90,nutrient - 110) / 90) : 1 );
    }
    static calculate_health(B,I,L)
    {
        return Math.floor( ( 2 * B + I) * L / 100 + L + 10 )
    }
    static calculate_stat(data,base,level,n,field)
    {
        let B = base.base[field];
        let I = data.gv[field];
        let result;
        if (field == 'health')
            result = Math.floor(FS_Animal.calculate_health(B,I,level) * n);
        else
            result = Math.floor( ( Math.floor( 2 * B + I ) * level / 100 + 5 ) * n);
        return result < 0 ? 0 : result;

    }
}

const generate_gv_set = (perfect_gvs = 1) => {
    let result = new Stats();
    let keys = Object.keys(result);
    let keys_cpy = [...keys];
    let perfect_arr = []; 
    for (let i = perfect_gvs; i--;)
        perfect_arr.push(keys_cpy.splice(Math.floor(Math.random() * (keys_cpy.length - 1)),1)[0]);
    for (let i = keys.length; i--;)
    {
        let key = keys[i];
        if (perfect_arr.includes(key))
            result[key] = 60;
        else
            result[keys[i]] = Math.floor(Math.random() * 60);
    }
    return result;
}

const get_level = (date) => {
    return Math.floor( (Date.now() - date.getTime()) / 86400000 )
}

const simulate_combat = (team,enemy_team) => {
    let battle_record = new CombatStatRecorder(team,enemy_team);
    team = team.map( (data,i) => ({ data: new FS_Animal(data), record: battle_record.team1.animals[i] }) );
    enemy_team = enemy_team.map( (data,i) => ({ data: new FS_Animal(data), record: battle_record.team2.animals[i] }) );
    for (let i = Math.max(team.length,enemy_team.length); i--;)
    {
        let _obj = team[i];
        if (_obj)
        {
            _obj.attack = abilities[_obj.data.species].attack_obj(team,enemy_team,_obj);
        }
            _obj = enemy_team[i];
        if (_obj)
        {
            _obj.attack = abilities[_obj.data.species].attack_obj(enemy_team,team,_obj);
        }
    }
    for (let i = 15; i--;)
    {
        if (enemy_team.length == 0)
            break;
        for (let j = team.length; j--;)
            team[j].attack();
        if (team.length == 0)
            break;
        for (let j = enemy_team.length; j--;)
            enemy_team[j].attack();
        battle_record.rounds++;
    }
    if (team.length == 0)
        battle_record.winner = battle_record.team2.user_id;
    else if (enemy_team.length == 0)
        battle_record.winner = battle_record.team1.user_id;
    else
    {
        let t1_sum = 0;
        let t2_sum = 0;
        let animals;
        {
            animals = battle_record.team1.animals;
            for (let i = animals.length; i--;)
                t1_sum += animals[i].dealt;
        }
        {
            animals = battle_record.team2.animals;
            for (let i = animals.length; i--;)
                t2_sum += animals[i].dealt;
        }
        if (t1_sum > t2_sum)
            battle_record.winner = battle_record.team1.user_id;
        else if (t2_sum > t1_sum)
            battle_record.winner = battle_record.team2.user_id;
    }
    return battle_record;
}

const check_dead = async (data) => {
    try
    {
        if (!is_same_day(data.updated_at,new Date()))
        {
            let level = get_level(data.created_at) + 1;
            let death = data.animal.level.death;
            if (
                level > death.max || (
                    level > death.min && Math.floor(Math.random() * 100) < (level - death.min) * death.scaling
                )
                )
            {
                await AnimalData.deleteOne({_id: data._id});
                return true;
            }
            else
                await AnimalData.updateOne({_id: data._id}, {protein: data.protein});
        }
        return false;
    }
    catch(err)
    {
        console.log(err);
        return true;
    }
}

const get_base = async (data) => {
    let base = await Animal.findOne({species: data.species});
    if (!base) return null;
    if (await check_dead(data,base))
        return null;
    return base;
}

const create_offspring = async (data) => {
    return await Offspring.create(data);
}

module.exports = {
    FS_Animal,
    Stats,
    generate_gv_set,
    CombatStatRecorder,
    simulate_combat,
    get_level,
    check_dead,
    get_base
}