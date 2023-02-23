/* eslint-disable prettier/prettier */
const { v4: uuidv4 } = require('uuid');
const SubClassificationModel = require('../models/SubClassification');

module.exports = {
  async create(request, response) {
    try {
      const subClassification = request.body;
      subClassification.id = uuidv4();
      await SubClassificationModel.create(subClassification);
      return response.status(201).json({ id: subClassification.id });
    } catch (err) {
      console.error(`SubClassification creation failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async getAll(request, response) {
    try {
      const result = await SubClassificationModel.getAll();
      return response.status(200).json(result);
    } catch (err) {
      console.error(`SubClassification getAll failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async getById(request, response) {
    try {
      const { id } = request.params;
      const result = await SubClassificationModel.getById(id);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`SubClassification getById failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async getByClassificationId(request, response) {
    try {
      const { classification_id } = request.params;
      const result = await SubClassificationModel.getByFields({ classification_id: classification_id });
      return response.status(200).json(result);
    } catch (err) {
      console.error(`SubClassification getById failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async update(request, response) {
    try {
      const { id } = request.params;
      const subClassification = request.body;

      const stillExistFieldsToUpdate = Object.values(subClassification).length > 0;
      if (stillExistFieldsToUpdate) {
        await SubClassificationModel.updateById(id, subClassification);
      }
      return response.status(200).json('OK');
    } catch (err) {
      console.error(`SubClassification update failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async delete(request, response) {
    try {
      const { id } = request.params;
      await SubClassificationModel.deleteById(id);
      return response.status(200).json("OK");
    } catch (err) {
      console.error(`SubClassification delete failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },
};
