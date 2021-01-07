const router = require('express').Router();
const AnimalData = require('../models/animal_data');
const Animal = require('../models/animal');
const { is_logged_in } = require('../middelware/authMiddleware');
const {get_animal} = require('../middelware/animalMiddleware');
const { FS_Animal, generate_gv_set } = require('../game_methods/animal_stats');

router.post('/data', is_logged_in(), get_animal(), async (req,res) => {
    res.status(200).json(new FS_Animal(res.locals.data,res.locals.base));
});

router.post('/new_team', is_logged_in(), async (req,res) => {
    const team = req.body.team;
    if (team.length != 3)
        return res.status(500).json({error: 'Please specify three species to create team.'});
    try
    {
        const base_arr = await Animal.find({ species: { $in: team } });
        if (base_arr.length !== 3)
            throw new Error('Team contains invalid species.');
        let insert_arr = [];
        for (let i = 3; i--;)
        {
            let base = base_arr[i];
            insert_arr.push({
                species: base.species,
                owner_id: req.user._id,
                gv: generate_gv_set(),
                protein: base.diet.protein,
                carbs: base.diet.carbs,
                fat: base.diet.fat,
                position: i * 2
            })
        }
        res.status(200).json(await AnimalData.insertMany(insert_arr));

    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json(err);
    }
})

module.exports = router;