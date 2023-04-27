/* eslint-disable prettier/prettier */
const GraphicModel = require('../models/Graphic');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

module.exports = {
  async create(request, response) {
    try {
      const graphic = request.body;
      graphic.id = uuidv4();
      await GraphicModel.create(graphic);
      return response.status(201).json({ id: graphic.id });
    } catch (err) {
      console.error(`graphic creation failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async getAll(request, response) {
    try {
      const result = await GraphicModel.getAll();

      return response.status(200).json(result);
    } catch (err) {
      console.error(`graphic getAll failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async getById(request, response) {
    try {
      const { id } = request.params;
      const result = await GraphicModel.getById(id);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`graphic getById failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async update(request, response) {
    try {
      const { id } = request.params;
      const graphic = request.body;

      const stillExistFieldsToUpdate = Object.values(graphic).length > 0;
      if (stillExistFieldsToUpdate) {
        await GraphicModel.updateById(id, graphic);
      }
      return response.status(200).json('OK');
    } catch (err) {
      console.error(`graphic update failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async delete(request, response) {
    try {
      const { id } = request.params;
      await GraphicModel.deleteById(id);
      return response.status(200).json("OK");
    } catch (err) {
      console.error(`graphic delete failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },
};
