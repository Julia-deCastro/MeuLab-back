/* eslint-disable prettier/prettier */
const { v4: uuidv4 } = require('uuid');
const ExperimentResultModel = require('../models/ExperimentResult');

module.exports = {
  async create(request, response) {
    try {
      const experimentResult = request.body;
      experimentResult.id = uuidv4();
      await ExperimentResultModel.create(experimentResult);
      return response.status(201).json({ id: experimentResult.id });
    } catch (err) {
      console.error(`Result creation failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async getAll(request, response) {
    try {
      const experimentResult = await ExperimentResultModel.getAll();
      return response.status(200).json(experimentResult);
    } catch (err) {
      console.error(`Result getAll failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async getById(request, response) {
    try {
      const { id } = request.params;
      const experimentResult = await ExperimentResultModel.getById(id);
      return response.status(200).json(experimentResult);
    } catch (err) {
      console.error(`Result getById failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async update(request, response) {
    try {
      const { id } = request.params;
      const experimentResult = request.body;

      const stillExistFieldsToUpdate = Object.values(experimentResult).length > 0;
      if (stillExistFieldsToUpdate) {
        await ExperimentResultModel.updateById(id, experimentResult);
      }
      return response.status(200).json('OK');
    } catch (err) {
      console.error(`Result update failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async delete(request, response) {
    try {
      const { id } = request.params;
      await ExperimentResultModel.deleteById(id);
      return response.status(200).json("OK");
    } catch (err) {
      console.error(`Result delete failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },
};
