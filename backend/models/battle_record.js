const { number } = require('keygenerator/lib/keygen');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const animal_obj = {
    _id: false,
    species: {type: String, required: true},
    taken: {type: Number, required: true},
    dealt: {type: Number, required: true},
    healed: {type: Number, required: true},
    healing: {type: Number, required: true}
}

const battleRecordSchema = new Schema({
    team1: { user_id: {type: mongoose.Types.ObjectId, required: true}, animals: [ animal_obj ], },
    team2: { user_id: {type: mongoose.Types.ObjectId, required: true}, animals: [ animal_obj ], },
    winner: { type: mongoose.Types.ObjectId },
    rounds: {type: Number, required: true}
})

module.exports = mongoose.model('battle_record',battleRecordSchema);