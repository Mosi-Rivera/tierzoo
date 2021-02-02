const mongoose = require('mongoose');

const HeroSchema = mongoose.Schema({
    hero:       {type: Number, unique: true,},
    tier:       {type: Number, required: true},
    name:       {type: String, required: true},
    hp:         {type: Number, required:true},
    atk:        {type: Number, required:true},
    def:        {type: Number, required:true},
    ability:    {type: String, required: true},
    crit:       {type: Number, default: 0},
    dodge:      {type: Number, default: 0},
    acc:        {type: Number, default: 0},
    haste:      {type: Number, default: 0},
    hp_recovery:{type: Number, default: 0},
    mr:         {type: Number, default: 0},
    pr:         {type: Number, default: 0},
    ll:         {type: Number, default: 0},
})

module.exports = mongoose.model('hero',HeroSchema);