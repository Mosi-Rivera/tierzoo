const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        require: true,
    },
    team: {
        0: {id: false, type: mongoose.Types.ObjectId, default: null, ref: 'hero_data'},
        1: {id: false, type: mongoose.Types.ObjectId, default: null, ref: 'hero_data'},
        2: {id: false, type: mongoose.Types.ObjectId, default: null, ref: 'hero_data'},
        3: {id: false, type: mongoose.Types.ObjectId, default: null, ref: 'hero_data'},
        4: {id: false, type: mongoose.Types.ObjectId, default: null, ref: 'hero_data'},
    },
    level: {type: Number, default: 1},
    story: {type: Number, default: 1},
    inventory: {
        scrolls:    {type: Number, default: 10,},
        gold:       {type: Number, default: 1000,},
        exp:        {type: Number, default: 1000,},
        essence:    {type: Number, default: 100,},
        gems:       {type: Number, default: 0,},
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