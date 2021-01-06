const Animal = require("../models/animal");

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
        this.species    = data.species;
        this.dealt      = 0;
        this.healing    = 0;
        this.taken      = 0;
    }
}

class CombatStatRecorder
{
    constructor(team1,team2)
    {
        this.winner = null;
        this.team1 = [];
        this.team2 = [];
        for (let i = team1.length; i--;)
            this.team1[i] = new AnimalCombatStats(team1[i]);
        for (let i = team2.length; i--;)
            this.team2[i] = new AnimalCombatStats(team2[i]);    
    }
}

class FS_Animal
{
    stats = new Stats();
    constructor(data,base)
    {
        let protein = Math.floor(data.protein / base.protein) * 100;
        let carbs = Math.floor(data.carbs / base.carbs) * 100;
        let fat = Math.floor(data.fat / base.fat) * 100;
        let protein_mod = FS_Animal.get_nutrient_mod(protein);
        let carb_mod    = FS_Animal.get_nutrient_mod(carbs);
        let fat_mod     = FS_Animal.get_nutrient_mod(fat);
        let curve       = base.level.curve;
        let death       = base.level.death;
        let fertility   = base.fertility;
        let level_raw   = Math.floor( (Date.now() - data.created_at.getTime()) / 86400000 ) + 1;
        let level;
        if (level_raw < curve)
            level = (level_raw / curve) * 100;
        else
            level = 100 - ( ( ( level_raw - curve ) / curve ) * 100)
        
        this.stats.health       = FS_Animal.calculate_stat(data,base,level,fat_mod,'health');
        this.stats.attack       = FS_Animal.calculate_stat(data,base,level,(carb_mod + protein_mod) / 2,'attack');
        this.stats.defence      = FS_Animal.calculate_stat(data,base,level,(protein_mod + fat_mod) / 2,'defence');
        this.stats.intelligence = FS_Animal.calculate_stat(data,base,level,carb_mod,'intelligence');
        this.stats.stealth      = FS_Animal.calculate_stat(data,base,level,1,'stealth');
        this.stats.mobility     = FS_Animal.calculate_stat(data,base,level,(card_mod + protein_mod + fat_mod) / 3,'mobility');

        this.can_reproduce = level_raw >= fertility.min && level_raw <= fertility.max;

        this.old_age = level_raw >= death.min;

        this.protein = protein;
        this.carbs = carbs;
        this.fat = fat;
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

const generate_gv_set = () => {
    let result = new Stats();
    let keys = Object.keys(result);
    let random = Math.floor(Math.random() * (keys.length - 1));
    for (let i = keys.length; i--;)
    {
        if (i == random)
            result[keys[i]] = 60;
        else
            result[keys[i]] = Math.floor(Math.random() * 60);
    }
    return result;
}

const build_team = async (team)  => {
    try
    {
        let result = [];
        for (let i = team.length; i--;)
        {
            let data = team[i];
            let base = await Animal.findOne({species: data.species});
            if (!base)
                throw new Error('Invalid animal species.');
            result.push(new FS_Animal(data,base));
        }
        return result;
    }
    catch(err)
    {
        console.log(err);
        throw new Error(err);
    }
}

const simulate_combat = (team,enemy_team) => {
    //TODO: Finish simulate combat logic;
    let battle_record = new CombatStatRecorder(team,enemy_team);
}

module.exports = {
    FS_Animal,
    Stats,
    generate_gv_set,
    build_team,
    CombatStatRecorder,
    simulate_combat
}