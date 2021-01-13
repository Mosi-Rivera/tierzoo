const {exponential_growth} = require('../helpers');

class HeroStats
{
    constructor(hero)
    {
        let data = hero.data;
        this.tier = hero.tier;
        this.name = hero.name;
        this.hp         = HeroStats.calc_health(hero);
        this.atk        = HeroStats.calc_attack(hero);
        this.def        = HeroStats.calc_defense(hero);
        this.power      = HeroStats.calc_hero_power(hero);
        this.crit       = (hero.weapon * 10);
        this.dodge      = (hero.greaves * 20);
        this.acc        = (hero.weapon * 10) + (hero.headpiece * 10);
        this.haste      = (hero.weapon * 10) (hero.greaves * 5);
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
        return exponential_growth(data.hp,.005,data.level - 1) + (hero.chestpiece * 1000) + (hero.greaves * 200) + (hero.headpiece * 200);
    }

    static calc_defense(hero)
    {
        let data = hero.data;
        return exponential_growth(data.hp,.005,data.level - 1) + (hero.chestpiece * 800) + (hero.greaves * 500) + (hero.headpiece * 500);
    }

    static calc_attack(hero)
    {
        let data = hero.data;
        return exponential_growth(data.atk,.005,data.level - 1) + (hero.weapon * 500);
    }
}

module.exports = {
    HeroStats
}