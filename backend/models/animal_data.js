const { number } = require('keygenerator/lib/keygen');
const mongoose = require('mongoose');

const AnimalDataSchema = mongoose.Schema({
    owner_id: {type: mongoose.Types.ObjectId, required: true},
    gv: {
        health:         {type: Number, required: true},
        attack:         {type: Number, required: true},
        defence:        {type: Number, required: true},
        stealth:        {type: Number, required: true},
        intelligence:   {type: Number, required: true},
        mobility:       {type: Number, required: true},
    },
    protein:    {type: Number, default: 100},
    carbs:      {type: Number, default: 100},
    fat:        {type: Number, default: 100},
    position:   {type: Number, required: true}
},
{
    timestamps: {
        createAt: 'created_at',
        updatedAt: 'updated_at',
    }
});

module.exports = mongoose.model('animal_data', AnimalDataSchema)