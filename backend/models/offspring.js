const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const offspring_schema = new Schema({
    owner_id: {type: mongoose.Types.ObjectId, required: true},
    species: {type: String, required: true},
    perfect_gv_count: {type: Number, default: 1},
});

module.exports = mongoose.model('offspring',offspring_schema);