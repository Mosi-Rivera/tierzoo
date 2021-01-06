const food_keys = [
    'meat',
    'fish',
    'insects',
    'berries',
    'vegetation',
    'worms',
    'cooked_meat' 
]
const food_keys_len = food_keys.length;

const random_key = () => food_keys[Math.floor(Math.random() * (food_keys_len - 1))];

const get_prizes = mult => {
    let result = {};
    for (let i = Math.floor((mult / 60) * 3); i--;)
    {
        let key = random_key();
        if (result[key])
            result[key]++;
        else
            result[key] = 1;
    }
    return result;
}

module.exports = {
    get_prizes
}