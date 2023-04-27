const express = require('express');

const subClassificationRouter = express.Router();

const subClassificationController = require('../../controllers/SubClassification');
const subClassificationValidator = require('../../validators/SubClassification');
const auth = require('../../middlewares/authentication');

subClassificationRouter.get('/',
  subClassificationValidator.getAll,
  auth.authenticateToken,
  subClassificationController.getAll
);
subClassificationRouter.get(
  '/:id',
  subClassificationValidator.getById,
  subClassificationController.getById
);
subClassificationRouter.get(
  '/classification/:classification_id',
  subClassificationController.getByClassificationId
);
subClassificationRouter.post(
  '/',
  subClassificationValidator.create,
  auth.authenticateToken,
  subClassificationController.create
);
subClassificationRouter.put(
  '/:id',
  subClassificationValidator.update,
  auth.authenticateToken,
  subClassificationController.update
);
subClassificationRouter.delete(
  '/:id',
  subClassificationValidator.delete,
  auth.authenticateToken,
  subClassificationController.delete
);

module.exports = subClassificationRouter;
