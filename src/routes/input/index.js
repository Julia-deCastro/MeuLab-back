const express = require('express');

const inputRouter = express.Router();

const inputController = require('../../controllers/Input');
const inputValidator = require('../../validators/Input');
const auth = require('../../middlewares/authentication');


inputRouter.get('/',
  inputValidator.getAll,
  auth.authenticateToken,
  inputController.getAll
);
inputRouter.get(
  '/getInput/:id',
  inputValidator.getById,
  auth.authenticateToken,
  inputController.getById
);
inputRouter.get(
  '/verifyCod/:id',
  inputValidator.getAll,
  auth.authenticateToken,
  inputController.getByCod
);
inputRouter.post(
  '/',
  inputValidator.create,
  auth.authenticateToken,
  inputController.create
);
inputRouter.put(
  '/:id',
  inputValidator.update,
  auth.authenticateToken,
  inputController.update
);
inputRouter.delete(
  '/:id',
  inputValidator.delete,
  auth.authenticateToken,
  inputController.delete
);

module.exports = inputRouter;
