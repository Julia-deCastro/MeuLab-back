/* eslint-disable prettier/prettier */
const InputModel = require('../models/Input');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async create(request, response) {
    try {
      const input = request.body;
      input.id = uuidv4();
      await InputModel.create(input);
      return response.status(201).json({ id: input.id });
    } catch (err) {
      console.error(`input creation failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async getAll(request, response) {
    try {
      const result = await InputModel.getAll();
      return response.status(200).json(result);
    } catch (err) {
      console.error(`input getAll failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async getById(request, response) {
    try {
      const { id } = request.params;
      const result = await InputModel.getById(id);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`input getById failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async getByCod(request, response) {
    try {
      const { id } = request.params;
      const result = await InputModel.getByCod(id);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`InputrgetByCod failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async update(request, response) {
    try {
      const { id } = request.params;
      const input = request.body;

      const stillExistFieldsToUpdate = Object.values(input).length > 0;
      if (stillExistFieldsToUpdate) {
        await InputModel.updateById(id, input);
      }
      return response.status(200).json('OK');
    } catch (err) {
      console.error(`input update failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async delete(request, response) {
    try {
      const { id } = request.params;
      await InputModel.deleteById(id);
      return response.status(200).json("OK");
    } catch (err) {
      console.error(`input delete failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },
};
