const express = require('express');

const admRouter = express.Router();

const AdmController = require('../../controllers/Adm');
const AdmValidator = require('../../validators/Adm');
const auth = require('../../middlewares/authentication');

admRouter.get('/',
  AdmValidator.geAll,
  auth.authenticateToken,
  AdmController.getAll
);
admRouter.get(
  '/:globalUser_id',
  AdmValidator.getById,
  auth.authenticateToken,
  AdmController.getById
);
admRouter.post(
  '/',
  AdmValidator.create,
  auth.authenticateToken,
  AdmController.create
);
admRouter.put(
  '/:globalUser_id',
  AdmValidator.update,
  auth.authenticateToken,
  AdmController.update
);
admRouter.delete(
  '/:globalUser_id',
  AdmValidator.delete,
  auth.authenticateToken,
  AdmController.delete
);

module.exports = admRouter;
