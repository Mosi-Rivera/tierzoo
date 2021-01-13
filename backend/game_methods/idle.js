const get_rewards = (minutes,elo) => {
    return {
        gold: Math.ceil(minutes * (elo/9)),
        exp: Math.ceil(minutes * (elo/40)),
        essence: Math.ceil(minutes * (elo/300))
    }
}

module.exports = {
    get_rewards,
}