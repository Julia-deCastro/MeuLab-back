/* eslint-disable prettier/prettier */
const Exp_Input_RealationModel = require('../models/Exp_Input_Relation');

module.exports = {
  async create(request, response) {
    try {
      const exp_input_relation = request.body;
      await Exp_Input_RealationModel.create(exp_input_relation);
      return response.status(201).json({ exp_input_relation });
    } catch (err) {
      console.error(`exp_input_relation creation failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async getAll(request, response) {
    try {
      const result = await Exp_Input_RealationModel.getAll();
      return response.status(200).json(result);
    } catch (err) {
      console.error(`exp_input_relation getAll failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async getById(request, response) {
    try {
      const { experiment_id } = request.params;
      const result = await Exp_Input_RealationModel.getById(experiment_id);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`exp_input_relation getById failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async delete(request, response) {
    try {
      const { input_id } = request.params;
      const { experiment_id } = request.params;
      await Exp_Input_RealationModel.deleteById(input_id, experiment_id);
      return response.status(200).json("OK");
    } catch (err) {
      console.error(`exp_input_relation delete failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },
};
