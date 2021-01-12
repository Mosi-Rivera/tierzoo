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
    new BaseData(0,1,'baby boxer',      5892,456,94,0),
    new BaseData(1,1,'monster',         5982,575,95,0),
    new BaseData(2,1,'ball & chain',    6201,514,101,0),
    new BaseData(3,1,'zapper',          5862,463,93,0),

    new BaseData(10,3,'merch-1.2.0',    12087,825,175,0),
    new BaseData(11,3,'shield droid',   7694,570,115,0),
    new BaseData(12,3,'spirit boxer',   7599,578,116,0),
    new BaseData(13,3,'stormhead',      8312,601,126,0),
    new BaseData(14,3,'mud guard',      8144,614,123,0),
]

mongoose.connect(uri);
Hero.insertMany(animals,function(err) {
    mongoose.disconnect();
    if (err)
        console.log(err);
    console.log('Seed completed!');    
})