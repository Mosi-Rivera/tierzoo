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
    new BaseData(0,1,'ball & chain',    105,125,100,0),
    new BaseData(1,1,'merch-1.2.0',    250,0,5,0),
    new BaseData(2,1,'shield droid',   114,0,120,0),
    new BaseData(10,2,'spirit boxer',   50,105,79,0),
    new BaseData(11,2,'stormhead',      80,115,85,0),
    new BaseData(12,2,'mud guard',      95,80,105,0),
]

mongoose.connect(uri);
Hero.insertMany(animals,function(err) {
    mongoose.disconnect();
    if (err)
        console.log(err);
    console.log('Seed completed!');    
})