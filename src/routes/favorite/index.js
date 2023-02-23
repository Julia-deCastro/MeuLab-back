const express = require('express');

const favoriteRouter = express.Router();

const favoriteController = require('../../controllers/Favorite');
const favoriteValidator = require('../../validators/Favorite');
const auth = require('../../middlewares/authentication');

favoriteRouter.get('/',
  favoriteValidator.geAll,
  auth.authenticateToken,
  favoriteController.getAll
);
favoriteRouter.get(
  '/:user_id',
  favoriteValidator.getById,
  auth.authenticateToken,
  favoriteController.getById
);
favoriteRouter.post(
  '/',
  favoriteValidator.create,
  auth.authenticateToken,
  favoriteController.create
);
favoriteRouter.delete(
  '/:user_id/:experiment_id',
  favoriteValidator.delete,
  auth.authenticateToken,
  favoriteController.delete
);

module.exports = favoriteRouter;
