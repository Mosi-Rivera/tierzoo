const {exponential_growth} = require('../helpers');
const { gold_cost, exp_cost, essence_cost } = require('./leveling');

class HeroStats
{
    constructor(hero,show_level_cost)
    {
        this.level      = hero.level;
        this._id        = hero._id;
        this.tier       = hero.tier;
        this.name       = hero.name;
        if (show_level_cost)
        {
            this.level_gold     = gold_cost(hero.level);
            this.level_exp      = exp_cost(hero.level);
            this.level_essence  = essence_cost(hero.level);
        }
        this.hp         = Math.floor(HeroStats.calc_health(hero));
        this.atk        = Math.floor(HeroStats.calc_attack(hero));
        this.def        = Math.floor(HeroStats.calc_defense(hero));
        this.power      = Math.floor(HeroStats.calc_hero_power(hero));
        this.crit       = (hero.weapon * 10);
        this.dodge      = (hero.greaves * 20);
        this.acc        = (hero.weapon * 10) + (hero.headpiece * 10);
        this.haste      = (hero.weapon * 10) + (hero.greaves * 5);
        this.hp_recovery= (hero.chestpiece * 10) + (hero.headpiece * 5);
        this.pr         = (hero.chestpiece * 20);
        this.ll         = (hero.weapon * 5);
    }

    static calc_hero_power(hero)
    {
        return (HeroStats.calc_attack(hero) * .2) + (HeroStats.calc_defense(hero) * 4.6) + (HeroStats.calc_attack(hero) * 4.7);
    }

    static calc_health(hero)
    {
        let data = hero.data;
        return exponential_growth(data.hp,.005,hero.level - 1) + (hero.chestpiece * 1000) + (hero.greaves * 200) + (hero.headpiece * 200);
    }

    static calc_defense(hero)
    {
        let data = hero.data;
        return exponential_growth(data.hp,.005,hero.level - 1) + (hero.chestpiece * 800) + (hero.greaves * 500) + (hero.headpiece * 500);
    }

    static calc_attack(hero)
    {
        let data = hero.data;
        return exponential_growth(data.atk,.005,hero.level - 1) + (hero.weapon * 500);
    }
}

module.exports = {
    HeroStats
}