const express = require('express');

const experimentRouter = express.Router();

const experimentController = require('../../controllers/Experiment');
const experimentValidator = require('../../validators/Experiment');
const auth = require('../../middlewares/authentication');

experimentRouter.get('/',
  experimentValidator.geAll,
  auth.authenticateToken,
  experimentController.getAll
);
experimentRouter.get('/class',
  experimentController.getByClassification
);
experimentRouter.get('/fields',
  experimentController.getByFields
);
experimentRouter.get(
  '/:id',
  experimentValidator.getById,
  auth.authenticateToken,
  experimentController.getById
);
experimentRouter.post(
  '/',
  experimentValidator.create,
  auth.authenticateToken,
  experimentController.create
);
experimentRouter.put(
  '/:id',
  experimentValidator.update,
  auth.authenticateToken,
  experimentController.update
);
experimentRouter.delete(
  '/:id',
  experimentValidator.delete,
  auth.authenticateToken,
  experimentController.delete
);

module.exports = experimentRouter;
