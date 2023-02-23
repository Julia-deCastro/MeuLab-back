const express = require('express');

const permissionRouter = express.Router();

const permissionController = require('../../controllers/Permission');
const permissionValidator = require('../../validators/Permission');
const auth = require('../../middlewares/authentication');

permissionRouter.get('/',
  permissionValidator.geAll,
  auth.authenticateToken,
  permissionController.getAll
);
permissionRouter.get(
  '/:id',
  permissionValidator.getById,
  auth.authenticateToken,
  permissionController.getById
);
permissionRouter.post(
  '/',
  permissionValidator.create,
  auth.authenticateToken,
  permissionController.create
);
permissionRouter.put(
  '/:id',
  permissionValidator.update,
  auth.authenticateToken,
  permissionController.update
);
permissionRouter.delete(
  '/:id',
  permissionValidator.delete,
  auth.authenticateToken,
  permissionController.delete
);

module.exports = permissionRouter;
