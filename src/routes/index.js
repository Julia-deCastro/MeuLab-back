const express = require('express');

// Principais
const globalUserRouter = require('./globalUser');
const admRouter = require('./adm');
const userRouter = require('./user');
const classificationRouter = require('./classification');
const subClassificationRouter = require('./subClassification');
const experimentRouter = require('./experiment');
const permissionRouter = require('./permission');
const scheduleRouter = require('./schedule');
const resultRouter = require('./result');
const favoriteRouter = require('./favorite');
const commentRouter = require('./comment');
const sessionRouter = require('./session');
const uploadRouter = require('./upload');
const imageRouter = require('./image');

const routes = express.Router();

// Principais
routes.use('/globalUsers', globalUserRouter);
routes.use('/adms', admRouter);
routes.use('/users', userRouter);
routes.use('/classifications', classificationRouter);
routes.use('/subClassifications', subClassificationRouter);
routes.use('/experiments', experimentRouter);
routes.use('/permissions', permissionRouter);
routes.use('/schedules', scheduleRouter);
routes.use('/results', resultRouter);
routes.use('/favorites', favoriteRouter);
routes.use('/comments', commentRouter);
routes.use('/login', sessionRouter);
routes.use('/uploadImage', uploadRouter);
routes.use('/images', imageRouter);

module.exports = routes;
