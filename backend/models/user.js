const mongoose = require('mongoose');
const AnimalData = require('./animal_data');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        require: true,
    },
    inventory: {
        meat:       {type: Number, default: 0,},
        fish:       {type: Number, default: 0,},
        insects:    {type: Number, default: 0,},
        berries:    {type: Number, default: 0,},
        vegetation: {type: Number, default: 0,},
        worms:      {type: Number, default: 0,},
        cooked_meat:{type: Number, default: 0,},
    },
    wild: {
        wins:   {type: Number, default: 0,},
        losses: {type: Number, default: 0,},
    },
    arena: {
        wins:   {type: Number, default: 0},
        losses: {type: Number, default: 0},
        elo:    {type: Number, default: 1200}
    },
    idle: {
        last_collect: {type: Date, default: () => new Date()}
    }
});

module.exports = mongoose.model('user',UserSchema)