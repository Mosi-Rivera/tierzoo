const mongoose = require('mongoose');
const {uri} = require('../uri');

mongoose.connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true
},function(err) {
    if (err)
        return console.log(err);
    console.log('Connected to db.');
});