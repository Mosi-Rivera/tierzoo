const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const authRoutes = require('./routes/auth_routes');
const userRoutes = require('./routes/user_routes');
const heroRoutes = require('./routes/hero_routes');
const arenaRoutes = require('./routes/arena_routes');
const compression = require('compression');
require('./configs/db');
var app = express();
require('./configs/passport')(app);
app.use(cors({origin: 'http://localhost:3000',credentials: true}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(function (req, res, next) {
    if (req.method == 'GET') 
        res.set('Cache-control', 'public, max-age=31536000');
    else
        res.set('Cache-control', `no-store`);
    next()
},
express.static(path.join(__dirname, 'build')));

app.use('/auth',authRoutes);
app.use('/user',userRoutes);
app.use('/hero',heroRoutes);
app.use('/arena',arenaRoutes);
app.use(compression());

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

module.exports = app;
