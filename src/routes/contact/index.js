const express = require('express');
const contactRouter = express.Router();

const contactController = require('../../controllers/Contact');

contactRouter.post('/',
  contactController.contact
);

module.exports = contactRouter;