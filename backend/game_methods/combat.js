const {HeroStats} = require('../game_methods/classes');
const abilities = require('./abilities');

class CombatRecord
{
    dealt = 0;
    taken = 0;
    healing_done = 0;
    healing_received = 0;
}

const simulate_combat = (ally_team,enemy_team) => {
    let record = {
        ally: [],
        enemy: [],
    }
    ally_team = ally_team.map((data,i) => {
        let stats = new HeroStats(data,true);
        record.ally.push(new CombatRecord());
        return ({ data: stats, index: i, attack: abilities[data.name](stats,i) })
    });
    enemy_team = enemy_team.map((data,i) => {
        let stats = new HeroStats(data,true);
        record.enemy.push(new CombatRecord());
        return ({ data: stats, index: i, attack: abilities[data.name](stats,i) })
    });
    let rounds = 0
    for (let i = 15; i--;)
    {
        if (enemy_team.length == 0)
            return {winner: 0,record,rounds};
        for (let j = ally_team.length; j--;)
            ally_team[j].attack(ally_team,enemy_team,record.ally,record.enemy);
        
        if (ally_team.length == 0)
            return {winner: 1,record,rounds};
        for (let j = enemy_team.length; j--;)
            enemy_team[j].attack(enemy_team,ally_team,record.enemy,record.ally);

        rounds++;
        
    }
    console.log(enemy_team,ally_team);
    return {winner: 1,record, rounds};
}

const calculate_hero_power = (hero) => {
    
    return (HeroStats.calc_attack(hero) * .2) + (HeroStats.calc_defense * 4.6) + (HeroStats.calc_attack * 4.7);
}

module.exports = {
    simulate_combat
}