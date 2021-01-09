const calculate_damage = (level,P,A,D,MODS = 1) => {
    return Math.round((
        (
            ((((2 *( level * (Math.round(Math.random() * 23) == 1 ? 2 : 1) )) / 5) + 2) * P * (A / D) ) / 50
        ) + 2
    ) * MODS);
}

module.exports = {
    calculate_damage
}