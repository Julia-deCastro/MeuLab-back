const express = require('express');

const classificationRouter = express.Router();

const classificationController = require('../../controllers/Classification');
const classificationValidator = require('../../validators/Classification');
const auth = require('../../middlewares/authentication');

classificationRouter.get('/',
  classificationController.getAll
);
classificationRouter.get('/subs',
  classificationController.getAllSub
);
classificationRouter.get(
  '/:id',
  classificationValidator.getById,
  classificationController.getById
);
classificationRouter.post(
  '/',
  classificationValidator.create,
  auth.authenticateToken,
  classificationController.create
);
classificationRouter.put(
  '/:id',
  classificationValidator.update,
  auth.authenticateToken,
  classificationController.update
);
classificationRouter.delete(
  '/:id',
  classificationValidator.delete,
  auth.authenticateToken,
  classificationController.delete
);

module.exports = classificationRouter;
