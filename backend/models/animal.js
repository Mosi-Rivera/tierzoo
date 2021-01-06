const mongoose = require('mongoose');

const AnimalSchema = mongoose.Schema({
    species: {type: String,unique: true,},
    base: {
        health:         {type: Number, required: true},
        attack:         {type: Number, required: true},
        defence:        {type: Number, required: true},
        stealth:        {type: Number, required: true},
        intelligence:   {type: Number, required: true},
        mobility:       {type: Number, required: true},
    },
    fertility: {
        start:  {type: Number, required: true}, 
        end:    {type: Number, required: true}
    },
    level: {
        death: {
            max:    {type: Number, required: true},
            min:    {type: Number, required: true},
            scaling:{type: Number, required: true}
        },
        curve: {type: Number, required: true}
    },
    diet: {
        protein:    {type: Number, required: true},
        carbs:      {type: Number, required: true},
        fat:        {type: Number, required: true}
    }
})

module.exports = mongoose.model('animal',AnimalSchema)