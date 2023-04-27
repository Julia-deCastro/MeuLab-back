const express = require('express');

const exp_input_relationRouter = express.Router();

const exp_input_relationController = require('../../controllers/Exp_Input_Relation');
const exp_input_relationValidator = require('../../validators/Exp_Input_Relation');
const auth = require('../../middlewares/authentication');

exp_input_relationRouter.get('/',
  exp_input_relationValidator.geAll,
  auth.authenticateToken,
  exp_input_relationController.getAll
);
exp_input_relationRouter.get(
  '/:experiment_id',
  exp_input_relationValidator.getById,
  auth.authenticateToken,
  exp_input_relationController.getById
);
exp_input_relationRouter.post(
  '/',
  exp_input_relationValidator.create,
  auth.authenticateToken,
  exp_input_relationController.create
);
exp_input_relationRouter.delete(
  '/:input_id/:experiment_id',
  exp_input_relationValidator.delete,
  auth.authenticateToken,
  exp_input_relationController.delete
);

module.exports = exp_input_relationRouter;
