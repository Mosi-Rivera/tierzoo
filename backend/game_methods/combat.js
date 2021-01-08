const calculate_damage = (level,P,A,D,MODS = 1) => {
    return (
        (
            ((((2 * level) / 5) + 2) * P * (A / D) ) / 50
        ) + 2
    ) * MODS;
}

module.exports = {
    calculate_damage
}