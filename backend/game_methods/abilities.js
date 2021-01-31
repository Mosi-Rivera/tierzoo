const calculate_damage = (atk,def,pr) => {
    return Math.max(0,Math.round(
        atk * ( ( 0.2 * atk ) / ( (0.2 * atk) + def) )
    ) - pr);
}
const get_lowest_health = arr => {
    let min = 10000000000;
    let result;

    for (let i = arr.length; i--;)
    {
        if (arr[i].data.hp < min)
        {
            result = i; 
            min = arr[i].data.hp;
        }
    }

    return result;
}

function deal_damage(damage,target)
{
    let shield = target.data.shield;
    console.log(damage);
    if (shield > 0)
    {
        damage = shield - damage;
        if (damage < 0)
        {
            shield = 0;
            damage = -damage;
        }
        else
        {
            shield = damage;
            damage = 0;
        }
    }
    target.data.hp -= damage;
    return damage;
}



module.exports = {
    ['ball & chain']:   function(data,index){
        return (allies,enemy,ally_record,enemy_record) =>
        {
            let target = enemy[enemy.length - 1];
            if (target)
            {
                let damage = deal_damage(calculate_damage(data.atk,target.data.def,0),target);
                enemy_record[target.index].taken    += damage;
                ally_record[index].dealt            += damage;
                if (target.data.hp <= 0)
                    enemy.splice(enemy.length - 1,1);
            }
        }
    },
    ['merch-1.2.0']:    function(data,index) {
        let count = 0;
        let max_heals = 3;
        let heals = max_heals;
        return function(allies,enemies,ally_record,enemy_record)
        {
            if (heals > 0)
            {
                let heal_index = get_lowest_health(allies);
                let target = allies[heal_index];
                if (target)
                {
                    let healing = data.atk/2;
                    target.data.hp += healing;
                    if (target.data.hp > target.max_hp)
                        target.data.hp = target.max_hp;
                    ally_record[heal_index].healing_received += healing;
                    ally_record[index].healing_done += healing;
                    heals--;
                }
            }
            count++;
            if (count >= 5)
            {
                count = 0;
                heals = max_heals;
            }
        }
    },
    ['shield droid']:   function(data,index){
        let shield_turn = 0;
        let turns = 3;
        return function(allies,enemies,ally_record,enemy_record)
        {
            if (shield_turn <= 0)
            {
                for (let i = allies.length; i--;)
                {
                    if (allies[i]._id !== data._id)
                        allies[i].data.shield += data.atk/5;
                }
                shield_turn = turns;
            }
            else
                for (let i = enemies.length; i--;)
                    enemies[i].data.shield /= 2;

            shield_turn--;
        }
    },
    ['spirit boxer']:   function(data,index){
        return function(allies,enemy,ally_record,enemy_record)
        {
            let target_index = get_lowest_health(enemy);
            let target = enemy[target_index];
            if (target)
            {
                let damage = deal_damage(calculate_damage(data.atk,target.data.def,0),target);
                enemy_record[target.index].taken    += damage;
                ally_record[index].dealt            += damage;
                if (target.data.hp <= 0)
                    enemy.splice(target_index,1);
            }
        }
    },
    ['stormhead']:      function(data,index){
        return function(allies,enemy,ally_record,enemy_record)
        {
            for (let i = enemy.length; i--;)
            {
                let target = enemy[i];
                if (target)
                {
                    let damage = deal_damage(calculate_damage(data.atk,target.data.def,0) / 2,target);
                    enemy_record[target.index].taken    += damage;
                    ally_record[index].dealt            += damage;
                }
                if (target.data.hp <= 0)
                    enemy.splice(i,1);
            }
        }
    },
    ['mud guard']:      function(data,index){
        let mult = 0;
        return function(allies,enemy,ally_record,enemy_record)
        {
            let target = enemy[enemy.length - 1];
            if (target)
            {
                let damage = deal_damage(calculate_damage(data.atk,target.data.def,0),target);
                enemy_record[target.index].taken    += damage;
                ally_record[index].dealt            += damage;
                if (target.data.hp <= 0)
                    enemy.splice(enemy.length - 1,1);
                data.atk += (++mult) + 1000;
                if (target.data.hp <= 0)
                    enemy.splice(enemy.length - 1,1);
            }
        }
    },
}