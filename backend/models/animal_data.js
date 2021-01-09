const { number } = require('keygenerator/lib/keygen');
const mongoose = require('mongoose');

const AnimalDataSchema = mongoose.Schema({
    owner_id: {type: mongoose.Types.ObjectId, required: true, ref: 'user'},
    animal: {type: mongoose.Types.ObjectId, required: true, ref: 'animal'},
    gv: {
        health:         {type: Number, required: true},
        attack:         {type: Number, required: true},
        defence:        {type: Number, required: true},
        stealth:        {type: Number, required: true},
        intelligence:   {type: Number, required: true},
        mobility:       {type: Number, required: true},
    },
    perfect_gv_count: {type: Number, required: true},
    protein:    {type: Number, required: true},
    carbs:      {type: Number, required: true},
    fat:        {type: Number, required: true},
    position:   {type: Number, required: true}
},
{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
});

module.exports = mongoose.model('animal_data', AnimalDataSchema)