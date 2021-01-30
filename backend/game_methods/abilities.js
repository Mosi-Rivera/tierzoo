const { calculate_damage } = require("./combat");

module.exports = {
    ['ball & chain']:   function(data,index){
        return function(allies,enemy,ally_record,enemy_record)
        {
            let target = enemy[enemy.length - 1];
            let damage = calculate_damage(data.attack,target.defense,0);
            target.health -= damage;
            enemy_record[target.index].taken    += damage;
            ally_record[index].dealt            += damage;
            if (target.data.health >= 0)
                enemy.splice(enemy.length - 1,1);
        }
    },
    ['merch-1.2.0']:    function(data){
        return function()
        {

        }
    },
    ['shield droid']:   function(data){
        return function()
        {

        }
    },
    ['spirit boxer']:   function(data){
        return function()
        {

        }
    },
    ['stormhead']:      function(data){
        return function()
        {

        }
    },
    ['mud guard']:      function(data){
        return function()
        {

        }
    },
}