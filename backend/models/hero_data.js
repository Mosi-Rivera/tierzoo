const { number } = require('keygenerator/lib/keygen');
const mongoose = require('mongoose');

const HeroDataSchema = mongoose.Schema({
    owner_id:   {type: mongoose.Types.ObjectId, required: true, ref: 'user'},
    data:       {type: mongoose.Types.ObjectId, required: true, ref: 'hero'},
    name:       {type: String, required: true},
    tier:       {type: Number, required: true},
    level:      {type: Number, default: 1, required: true},
    chestpiece: {type: Number, default: 0},
    headpiece:  {type: Number, default: 0},
    weapon:     {type: Number, default: 0},
    greaves:    {type: Number, default: 0},
    mythic:     {type: Number, default: 0},
},
{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
});

module.exports = mongoose.model('hero_data', HeroDataSchema)