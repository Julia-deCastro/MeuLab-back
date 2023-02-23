const express = require('express');

const scheduleRouter = express.Router();

const scheduleController = require('../../controllers/Schedule');
const scheduleValidator = require('../../validators/Schedule');
const auth = require('../../middlewares/authentication');

scheduleRouter.get('/',
  scheduleValidator.geAll,
  auth.authenticateToken,
  scheduleController.getAll
);
scheduleRouter.get(
  '/:id',
  scheduleValidator.getById,
  auth.authenticateToken,
  scheduleController.getById
);
scheduleRouter.post(
  '/',
  scheduleValidator.create,
  auth.authenticateToken,
  scheduleController.create
);
scheduleRouter.put(
  '/:id',
  scheduleValidator.update,
  auth.authenticateToken,
  scheduleController.update
);
scheduleRouter.delete(
  '/:id',
  scheduleValidator.delete,
  auth.authenticateToken,
  scheduleController.delete
);

module.exports = scheduleRouter;
