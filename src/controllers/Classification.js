/* eslint-disable prettier/prettier */
const { v4: uuidv4 } = require('uuid');
const ClassificationModel = require('../models/Classification');

module.exports = {
  async create(request, response) {
    try {
      const classification = request.body;
      classification.id = uuidv4();
      await ClassificationModel.create(classification);
      return response.status(201).json({ id: classification.id });
    } catch (err) {
      console.error(`Classification creation failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async getAll(request, response) {
    try {
      const result = await ClassificationModel.getAll();
      return response.status(200).json(result);
    } catch (err) {
      console.error(`Classification getAll failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async getAllSub(request, response) {
    try {
      const result = await ClassificationModel.getAllSub();
      return response.status(200).json(result);
    } catch (err) {
      console.error(`Classification getAll failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async getById(request, response) {
    try {
      const { id } = request.params;
      const result = await ClassificationModel.getById(id);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`Classification getById failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async update(request, response) {
    try {
      const { id } = request.params;
      const classification = request.body;

      const stillExistFieldsToUpdate = Object.values(classification).length > 0;
      if (stillExistFieldsToUpdate) {
        await ClassificationModel.updateById(id, classification);
      }
      return response.status(200).json('OK');
    } catch (err) {
      console.error(`Classification update failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async delete(request, response) {
    try {
      const { id } = request.params;
      await ClassificationModel.deleteById(id);
      return response.status(200).json("OK");
    } catch (err) {
      console.error(`Classification delete failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },
};
