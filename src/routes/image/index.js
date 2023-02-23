const express = require('express');

const imageRouter = express.Router();

const imageController = require('../../controllers/image');
const imageValidator = require('../../validators/image');
const auth = require('../../middlewares/authentication');

imageRouter.get('/',
  auth.authenticateToken,
  imageController.getAll
);
imageRouter.get(
  '/:id',
  imageValidator.getById,
  auth.authenticateToken,
  imageController.getById
);
imageRouter.post(
  '/',
  imageValidator.create,
  auth.authenticateToken,
  imageController.create
);
imageRouter.put(
  '/:id',
  imageValidator.update,
  auth.authenticateToken,
  imageController.update
);
imageRouter.delete(
  '/:id',
  imageValidator.delete,
  auth.authenticateToken,
  imageController.delete
);

module.exports = imageRouter;
