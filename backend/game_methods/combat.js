const {HeroStats} = require('../game_methods/classes');
const abilities = require('./abilities');
const calculate_damage = (attack,defense,pr) => {
    return Math.max(0,Math.round(
        attack * ( ( 0.2 * attack ) / ( (0.2 * attack) + defense) )
    ) - pr);
}

const simulate_combat = (ally_team,enemy_team) => {
    ally_team = ally_team.map(data => ({ data: new HeroStats(data), attack: abilities[data.name](data) }));
    enemy_team = enemy_team.map(data => ({ data: new HeroStats(data), attack: abilities[data.name](data) }));
    let record = [];
    let rounds = 0
    for (let i = 15; i--;)
    {
        
        if (enemy_team.length == 0)
            return {winner: 0,record};
        for (let j = ally_team.length; j--;)
            record.push(ally_team[j].attack(enemy_team));
        
        if (ally_team.length == 0)
            return {winner: 1,record};
        for (let j = enemy_team.length; j--;)
            record.push(enemy_team[j].attack(ally_team));

        rounds++;
        
    }
    return {winner: 1,record, rounds};
}

const calculate_hero_power = (hero) => {
    
    return (HeroStats.calc_attack(hero) * .2) + (HeroStats.calc_defense * 4.6) + (HeroStats.calc_attack * 4.7);
}

module.exports = {
    calculate_damage,
    simulate_combat
}