const { number } = require('keygenerator/lib/keygen');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const animal_obj = {
    _id: false,
    species: {type: String, required: true},
    taken: {type: Number, required: true},
    dealt: {type: Number, required: true},
    healed: {type: Number, required: true}
}

const battleRecordSchema = new Schema({
    team_1: { user_id: mongoose.Types.ObjectId, animals: [ animal_obj ], },
    team_2: { user_id: mongoose.Types.ObjectId, animals: [ animal_obj ], },
    winner: { type: mongoose.Types.ObjectId, required: true, },
})

module.exports = mongoose.model('battle_record',battleRecordSchema);