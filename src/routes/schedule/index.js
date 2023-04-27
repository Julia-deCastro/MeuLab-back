const express = require('express');

const scheduleRouter = express.Router();

const scheduleController = require('../../controllers/Schedule');
const scheduleValidator = require('../../validators/Schedule');
const auth = require('../../middlewares/authentication');

scheduleRouter.get('/',
  scheduleValidator.getAll,
  auth.authenticateToken,
  scheduleController.getAll
);
scheduleRouter.get(
  '/:id',
  scheduleValidator.getById,
  auth.authenticateToken,
  scheduleController.getById
);
scheduleRouter.get(
  '/field/fields',
  scheduleValidator.getByFields,
  auth.authenticateToken,
  scheduleController.getByFields
);
scheduleRouter.get(
  '/experiment/fields',
  scheduleValidator.getByExperiment,
  auth.authenticateToken,
  scheduleController.getByExperiment
);
scheduleRouter.get(
  '/user/fields',
  scheduleValidator.getByExperiment,
  auth.authenticateToken,
  scheduleController.getByExpUser
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
