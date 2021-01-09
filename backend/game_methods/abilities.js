const {calculate_damage} = require('../game_methods/combat');
const basic_attack = (self,enemies,target_index,power,mod = 1) => {
    target_index = typeof target_index == 'number' ? target_index : Math.round(Math.random() * (enemies.length - 1));
    let target = enemies[target_index];
    if (!target)
        return;
    if (!self)
        console.log('self',self);
    if (!target)
        console.log('target',target);
    let damage = calculate_damage(self.data.level,power,self.data.stats.attack,target.data.stats.defence,mod);
    target.data.stats.health -= damage;
    target.record.taken += damage;
    self.record.dealt += damage;
    if (target.data.stats.health <= 0)
        enemies.splice(target_index,1);
}
const get_weakest_index = team => {
    let value = 1000000;
    let result = null;
    for (let i = team.length; i--;)
    {
        let health = team[i].data.health;
        if (health < value) {
            value = health;
            result = i;
        }
    }
    return result;
}
const bear = {
    attack_obj: function(allies,enemies,self) {
        let data = self.data;
        let record = self.record;
        let base_health = data.stats.health;
        let min_heal_health = base_health/2;
        let power = 70;
        let can_heal = true;
        let resting = 0;
        return () => {
            if (!resting--)
            {
                if (can_heal && data.stats.health < min_heal_health)
                {
                    let heal = data.level * 2;
                    data.health += heal;
                    record.healed += heal;
                    can_heal = false;
                    resting = 1;
                }
                else 
                {
                    basic_attack(self,enemies,null,power);
                    power = power == 70 ? 110 : 70; 
                }
            }
        } 
    }
}
const wolf = {
    attack_obj: function(allies,enemies,self)
    {
        let boost = 3;
        let hiding = true;
        return () => {
            if (!hiding)
                basic_attack(self,enemies,get_weakest_index(enemies),120,boost ? 1.4 : 1);
            hiding = !hiding;
            if (allies.length != 3)
                boost--;
        }
    }
}
const moose = {
    attack_obj: function(allies,enemies,self) {
        let power = 30;
        return () => {
            if (enemies[0])
                basic_attack(self,enemies,0,power);
            if (enemies[1])
                basic_attack(self,enemies,1,power);
            power += 5;
        }
    }
}
const chimpanzee = {
    attack_obj: function(allies,enemies,self) {
        let heal = false;
        let data = self;
        let record = self.record;
        return () => {
            if (heal)
            {
                let target_index = get_weakest_index(allies);
                let target = allies[target_index];
                let amount = Math.floor(data.level / 2);
                target.record.healed += amount;
                record.heal += amount;
                target.data.stats.health += amount;
            }
            else
                basic_attack(allies,enemies,index,null,80);
            heal = !heal;
        }
    }
}

module.exports = {
    bear,
    wolf,
    moose,
    chimpanzee
}