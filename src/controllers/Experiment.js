/* eslint-disable prettier/prettier */
const { v4: uuidv4 } = require('uuid');
const { getByClassification } = require('../models/Experiment');
const ExperimentModel = require('../models/Experiment');


module.exports = {
  async create(request, response) {
    try {
      const experiment = request.body;
      experiment.id = uuidv4();
      await ExperimentModel.create(experiment);
      return response.status(201).json({ id: experiment.id });
    } catch (err) {
      console.error(`Experiment creation failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async getAll(request, response) {
    try {
      const result = await ExperimentModel.getAll();
      return response.status(200).json(result);
    } catch (err) {
      console.error(`Experiment getAll failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async getByClassification(request, response) {
    try {
      const result = await ExperimentModel.getByClassification();
      return response.status(200).json(result);
    } catch (err) {
      console.error(`Experiment getByClassification failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async getById(request, response) {
    try {
      const { id } = request.params;
      const result = await ExperimentModel.getById(id);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`Experiment getById failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async getByFields(request, response) {
    try {
      const fields = request.query;
      const result = await ExperimentModel.getByFields(fields);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`Experiment getById failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async update(request, response) {
    try {
      const { id } = request.params;
      const experiment = request.body;

      const stillExistFieldsToUpdate = Object.values(experiment).length > 0;
      if (stillExistFieldsToUpdate) {
        await ExperimentModel.updateById(id, experiment);
      }
      return response.status(200).json('OK');
    } catch (err) {
      console.error(`Experiment update failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async delete(request, response) {
    try {
      const { id } = request.params;
      await ExperimentModel.deleteById(id);
      return response.status(200).json("OK");
    } catch (err) {
      console.error(`Experiment delete failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },
};
