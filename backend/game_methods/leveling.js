const {exponential_growth} = require('../helpers');

const gold_cost = level => Math.floor(exponential_growth(23,.15,level));
const exp_cost = level => Math.floor(exponential_growth(89,.1,level));
const essence_cost = level => level%20 === 0 ? ((level/20) * 40) * 2.5 : 0;

module.exports = {
    gold_cost,
    exp_cost,
    essence_cost
}