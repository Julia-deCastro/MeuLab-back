const express = require('express');

const graphicLineRouter = express.Router();

const GraphicLineController = require('../../controllers/Graphic_Line');
const GraphicLineValidator = require('../../validators/Graphic_Line');
const auth = require('../../middlewares/authentication');

graphicLineRouter.get('/',
  GraphicLineValidator.getAll,
  auth.authenticateToken,
  GraphicLineController.getAll
);
graphicLineRouter.get(
  '/:id',
  GraphicLineValidator.getById,
  auth.authenticateToken,
  GraphicLineController.getById
);
graphicLineRouter.post(
  '/',
  GraphicLineValidator.create,
  GraphicLineController.create
);
graphicLineRouter.put(
  '/:id',
  GraphicLineValidator.update,
  auth.authenticateToken,
  GraphicLineController.update
);
graphicLineRouter.delete(
  '/:id',
  GraphicLineValidator.delete,
  GraphicLineController.delete
);

module.exports = graphicLineRouter;
