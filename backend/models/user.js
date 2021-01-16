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
        type: [{id: false, type: mongoose.Types.ObjectId, default: null, ref: 'hero_data'}],
        default: [null,null,null,null,null],
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