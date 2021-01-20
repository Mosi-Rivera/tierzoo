const get_rewards = (minutes,elo) => {
    return {
        ['inventory.gold']: Math.ceil(minutes * (elo/9)),
        ['inventory.exp']: Math.ceil(minutes * (elo/40)),
        ['inventory.essence']: Math.ceil(minutes * (elo/300))
    }
}

module.exports = {
    get_rewards,
}