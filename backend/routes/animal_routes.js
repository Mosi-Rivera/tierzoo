const router = require('express').Router();
const AnimalData = require('../models/animal_data');
const Animal = require('../models/animal');
const { is_logged_in } = require('../middelware/authMiddleware');
const {get_animal} = require('../middelware/animalMiddleware');
const { FS_Animal, generate_gv_set } = require('../game_methods/animal_stats');
const Offspring = require('../models/offspring');

router.post('/data', is_logged_in(), async (req,res) => {
    res.status(200).json(new FS_Animal(await get_animal(req.body.id)));
});

router.post('/offspring_to_team',is_logged_in(), async (req,res) => {
    const id = req.body.id;
    const replace_id = req.body.id;
    try {
        const os = Offsrping.findOne({_id: id, owner_id: req.user.id});
        if (!os)
            throw new Error('Invalid id.');
        let base = Animal.findOne({species: os.species});
        if (!base)
            throw new Error('Invalid data');
        let replacing = await AnimalData.findOne({_id: replace_id});
        if (!replacing)
            throw new Error('Invalid replace_id.');
        let position = replacing.position;
        let result = await AnimalData.create({
            animal: base._id,
            owner_id: req.user._id,
            gv: generate_gv_set(os.perfect_gv_count),
            perfect_gv_count: os.perfect_gv_count,
            protein: base.diet.protein,
            carbs: base.diet.carbs,
            fat: base.diet.fat,
            position
        })
        await AnimalData.deleteOne({_id: replace_id});
        return res.status(200).json(result);
    }
    catch(err)
    {

    }
})

router.get('/delete_team', is_logged_in(), async (req,res) => {
    try
    {
        await AnimalData.deleteMany({owner_id: req.user._id});
        return res.status(200).json({message: 'Team deleted.'});
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json(err);
    }
})

router.post('/new_team', is_logged_in(), async (req,res) => {
    const team = req.body.team;
    if (team.length != 3)
        return res.status(500).json({error: 'Please specify three species to create team.'});
    try
    {
        if (await AnimalData.find({owner_id: req.user._id}).count())
            throw new Error('User already has team.');
        const base_arr = await Animal.find({ species: { $in: team } });
        if (base_arr.length !== 3)
            throw new Error('Team contains invalid species.');
        let insert_arr = [];
        for (let i = 3; i--;)
        {
            let base = base_arr[i];
            insert_arr.push({
                animal: base._id,
                owner_id: req.user._id,
                gv: generate_gv_set(),
                perfect_gv_count: 1,
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
        return res.status(500).json({mesage: err});
    }
})

module.exports = router;