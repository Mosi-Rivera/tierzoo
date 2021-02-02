const mongoose = require('mongoose');
const uri = require('../uri').uri
const Hero = require('../models/hero');
class BaseData {
    constructor(
        id,
        tier,
        name,
        hp,
        atk,
        def,
        abilities,
        crit = 0,
        dodge = 0,
        acc = 0,
        haste = 0,
        hp_recovery = 0,
        mr = 0,
        pr = 0,
        ll = 0
    )
    {
        this.ability = abilities;
        this.hero = id;
        this.tier = tier;
        this.name = name;
        this.hp = hp;
        this.atk = atk;
        this.def = def;
        this.crit = crit;
        this.dodge = dodge;
        this.acc = acc;
        this.haste = haste;
        this.hp_recovery = hp_recovery;
        this.mr = mr;
        this.pr = pr;
        this.ll = ll;
    }
}

const animals = [
    new BaseData(0,1,'ball & chain',    105,125,100,"Attack's the closest enemy with devastating blows."),
    new BaseData(1,1,'merch-1.2.0',    250,0,5,"Heals the closest ally every three rounds. In the meantime he chills."),
    new BaseData(2,1,'shield droid',   114,0,120,"Halves the shields of all enemies each round. Every third round gives all allies small shield."),
    new BaseData(10,2,'spirit boxer',   50,105,79,"Attacks the weakest enemy each round."),
    new BaseData(11,2,'stormhead',      80,115,85,"Deals damage to all enemies each round."),
    new BaseData(12,2,'mud guard',      95,80,105,"Attacks the closest enemy each round. Whenever he succesfuly deals damage his attack is raised."),
]

mongoose.connect(uri);
Hero.insertMany(animals,function(err) {
    mongoose.disconnect();
    if (err)
        console.log(err);
    console.log('Seed completed!');    
})