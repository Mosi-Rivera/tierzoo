const router = require('express').Router();
const AnimalData = require('../models/animal_data');
const Animal = require('../models/animal');
const { is_logged_in } = require('../middelware/authMiddleware');
const { FS_Animal, generate_gv_set } = require('../game_methods/animal_stats');

router.get('/data', is_logged_in(), async (req,res) => {
    const id = req.query.id;
    try
    {
        let animal_data = await AnimalData.findOne({_id: id});
        if (!animal_data) throw new Error('Invalid id.');
        let animal = await Animal.findOne({species: animal_data.species});
        if (!animal) throw new Error('invalid species.');
        return res.status(200).json(new FS_Animal(animal_data,animal));
    }
    catch (err)
    {
        console.log(err);
        return res.status(500).json(err);
    }
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
                owner_id: req.user._id,
                gv: generate_gv_set(),
                protein: base.protein,
                carbs: base.carbs,
                fat: base.fat,
                position: i * 2
            })
        }
        AnimalData.insertMany(insert_arr);
    }
    catch(err)
    {
        console.log(err);
        return res.status(200).json(err);
    }
})

module.exports = router;