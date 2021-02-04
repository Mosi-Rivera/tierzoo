const elo_prizes = (current,max) => {
    if (current / 50 > max / 50)
        return 500;
    return 0;
};

const win_prizes = (wins) => {
    if (wins == 1)
        return 2700;
    else if (wins == 10)
        return 500;
    else if (wins%50 == 0)
        return 500;
    return 0;
};

const game_prizes = (games) => {
    if (games == 1)
        return 1000;
    else if (games == 50)
        return 250;
    else if (games % 100 == 0)
        return 250; 
    return 0;  
};

module.exports = (arena,did_win) => (
    game_prizes(arena.losses + arena.games) + 
    (did_win ? win_prizes(arena.wins) + 100 : 0) + 
    elo_prizes(arena.elo,arena.elo_pr)
);