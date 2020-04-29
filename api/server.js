const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const registerRouter = require('../auth/register-router');
const loginRouter = require('../auth/login-router');
const usersRouter = require('../users/users-router');
const restricted = require('../auth/restricted-middleware');
const checkRole = require('../auth/check-role-middleware');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(morgan('dev'));

server.use('/api/register', registerRouter);
server.use('/api/login', loginRouter);
server.use('/api/users', restricted, checkRole('HR'), usersRouter);

server.get('/', (req, res) => {
    res.send('Auth JWT Server is Running')
});

module.exports = server;
