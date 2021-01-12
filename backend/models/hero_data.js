const { number } = require('keygenerator/lib/keygen');
const mongoose = require('mongoose');

const HeroDataSchema = mongoose.Schema({
    owner_id:   {type: mongoose.Types.ObjectId, required: true, ref: 'user'},
    data:       {type: mongoose.Types.ObjectId, required: true, ref: 'hero'},
    name:       {type: String, required: true},
    tier:       {type: Number, required: true},
    level:      {type: Number, default: 1, required: true},
    chestpiece: {type: Number, default: null},
    headpiece:  {type: Number, default: null},
    weapon:     {type: Number, default: null},
    greaves:    {type: Number, default: null},
    mythic:     {type: Number, default: null},
},
{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
});

module.exports = mongoose.model('hero_data', HeroDataSchema)