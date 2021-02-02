const {exponential_growth} = require('../helpers');
const { gold_cost, exp_cost, essence_cost } = require('./leveling');

class HeroStats
{
    constructor(hero,combat)
    {
        let level = hero.level;
        hero.level += --hero.tier * 2;
        this._id        = hero._id;
        this.tier       = hero.tier;
        this.name       = hero.name;
        this.hp         = HeroStats.stat_calc('hp',hero);
        this.atk        = HeroStats.stat_calc('atk',hero);
        this.def        = HeroStats.stat_calc('def',hero);
        this.power      = HeroStats.calc_hero_power(this.atk,this.def,this.hp);
        this.crit       = (hero.weapon * 10);
        this.dodge      = (hero.greaves * 20);
        this.acc        = (hero.weapon * 10) + (hero.headpiece * 10);
        this.haste      = (hero.weapon * 10) + (hero.greaves * 5);
        this.hp_recovery= (hero.chestpiece * 10) + (hero.headpiece * 5);
        this.pr         = (hero.chestpiece * 20);
        this.ll         = (hero.weapon * 5);
        if (combat)
        {
            this.max_hp = this.hp;
            this.shield = 0;
            this.level = hero.level;
        }
        else
        {
            this.level = level;
            this.ability = hero.data.ability;
        }
    }

    static stat_calc(str,data)
    {
        if (str === 'hp')
            return Math.round(((((data.data[str] + 31) * 2) * data.level) / 100) + data.level + 10);
        else
            return Math.round(((data.data[str] + 31) * 2 * data.level) / 100) + 5;
    }

    static calc_hero_power(atk,def,hp)
    {
        return Math.round(hp * .2) + (def * 4.6) + (atk * 4.7);
    }
}

module.exports = {
    HeroStats
}