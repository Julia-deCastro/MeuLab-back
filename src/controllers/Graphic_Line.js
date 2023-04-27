/* eslint-disable prettier/prettier */
const GraphicLineModel = require('../models/Graphic_Line');
require('dotenv').config();

module.exports = {
  async create(request, response) {
    try {
      const graphic_line = request.body;

      await GraphicLineModel.create(graphic_line);
      return response.status(201).json({ id: graphic_line.graphic_id });
    } catch (err) {
      console.error(`graphic_line creation failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async getAll(request, response) {
    try {
      const result = await GraphicLineModel.getAll();

      return response.status(200).json(result);
    } catch (err) {
      console.error(`graphic_line getAll failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async getById(request, response) {
    try {
      const { graphic_id } = request.params;
      const result = await GraphicLineModel.getById(graphic_id);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`graphic_line getById failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async update(request, response) {
    try {
      const { graphic_id } = request.params;
      const graphic_line = request.body;

      const stillExistFieldsToUpdate = Object.values(graphic_line).length > 0;
      if (stillExistFieldsToUpdate) {
        await GraphicLineModel.updateById(graphic_id, graphic_line);
      }
      return response.status(200).json('OK');
    } catch (err) {
      console.error(`graphic_line update failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async delete(request, response) {
    try {
      const { graphic_id } = request.params;
      await GraphicLineModel.deleteById(graphic_id);
      return response.status(200).json("OK");
    } catch (err) {
      console.error(`graphic_line delete failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },
};
