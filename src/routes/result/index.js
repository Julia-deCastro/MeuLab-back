const express = require('express');

const resultRouter = express.Router();

const resultController = require('../../controllers/result');
const resultValidator = require('../../validators/result');
const auth = require('../../middlewares/authentication');

resultRouter.get('/',
  resultValidator.geAll,
  auth.authenticateToken,
  resultController.getAll
);
resultRouter.get(
  '/:id',
  resultValidator.getById,
  auth.authenticateToken,
  resultController.getById
);
resultRouter.post(
  '/',
  resultValidator.create,
  auth.authenticateToken,
  resultController.create
);
resultRouter.put(
  '/:id',
  resultValidator.update,
  auth.authenticateToken,
  resultController.update
);
resultRouter.delete(
  '/:id',
  resultValidator.delete,
  auth.authenticateToken,
  resultController.delete
);

module.exports = resultRouter;
