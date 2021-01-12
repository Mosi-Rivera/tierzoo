const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const authRoutes = require('./routes/auth_routes');
const userRoutes = require('./routes/user_routes');
const heroRoutes = require('./routes/hero_routes');
const arenaRoutes = require('./routes/arena_routes');
require('./configs/db');
var app = express();
require('./configs/passport')(app);
app.use(cors({origin: 'http://localhost:3000',credentials: true}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth',authRoutes);
app.use('/user',userRoutes);
app.use('/hero',heroRoutes);
app.use('/arena',arenaRoutes);

module.exports = app;
