const elo = new (require('elo-rank'))(32);

module.exports = function(eloA,eloB)
{
    const expectedScoreA = elo.getExpected(eloA,eloB);
    const expectedScoreB = elo.getExpected(eloB,eloA);

    return (a,b) => {
        let new_a = elo.updateRating(expectedScoreA,a,eloA);
        let new_b = elo.updateRating(expectedScoreB,b,eloB);
        return {
            a: {
                difference: new_a - eloA,
                new: new_a,
            },
            b: {
                difference: new_b - eloB,
                new: new_b,
            }
        }
    }
}