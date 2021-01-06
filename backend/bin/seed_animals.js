const mongoose = require('mongoose');
const uri = require('../uri').uri
const Animal = require('../models/animal');
class BaseData {
    constructor(
        species,
        health,
        attack,
        defence,
        stealth,
        intelligence,
        mobility,
        start,
        end,
        max,
        min,
        scaling,
        curve,
        protein,
        carbs,
        fat
    )
    {
        this.species = species;
        this.base = {
            health:         health || 0,
            attack:         attack || 0,
            defence:        defence || 0,
            stealth:        stealth || 0,
            intelligence:   intelligence || 0,
            mobility:       mobility || 0
        };
        this.fertility = {
            start:  start,
            end:    end
        };
        this.level = {
            death: {
                max:    max,
                min:    min,
                scaling:scaling
            },
            curve: curve
        };
        this.diet = {
            protein:    protein,
            carbs:      carbs,
            fat:        fat
        }
    }
}

const animals = [
    new BaseData('bear',75,90,45,40,75,60,5,20,30,20,5,20,10,60,20),
    new BaseData('wolf',30,70,30,60,80,80,3,8,8,6,1,6,5,30,10),
    new BaseData('moose',70,80,72,22,58,38,3,15,25,15,5,15,10,90,5),
    new BaseData('chimpanzee',45,70,20,20,80,75,7,35,39,34,10,30,20,40,10)
]

mongoose.connect(uri);
Animal.insertMany(animals,function(err) {
    mongoose.disconnect();
    if (err)
        console.log(err);
    console.log('Seed completed!');    
})