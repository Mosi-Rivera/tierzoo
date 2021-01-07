const bear = {
    a1: (allies,enemies,index,record) => {
        let self = allies[index];
        let target = enemies[Math.round(Math.random() * (enemies.length - 1))];

    },
    a2: (allies,enemies,index,record) => {
        let self = allies[index];
        let target = enemies[Math.round(Math.random() * (enemies.length - 1))];

    },
    a3: (allies,enemies,index,record) => {
        let self = allies[index];
        let target = enemies[Math.round(Math.random() * (enemies.length - 1))];

    }, 
}

module.exports = {
    bear,
    wolf,
    moose,
    chimpanzee
}