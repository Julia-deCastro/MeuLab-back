/* eslint-disable prettier/prettier */
const { v4: uuidv4 } = require('uuid');
const ScheduleModel = require('../models/Schedule');

module.exports = {
  async create(request, response) {
    try {
      const schedule = request.body;
      schedule.id = uuidv4();
      await ScheduleModel.create(schedule);
      return response.status(201).json({ id: schedule.id });
    } catch (err) {
      console.error(`Schedule creation failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async getAll(request, response) {
    try {
      const result = await ScheduleModel.getAll();
      return response.status(200).json(result);
    } catch (err) {
      console.error(`Schedule getAll failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async getById(request, response) {
    try {
      const { id } = request.params;
      const result = await ScheduleModel.getById(id);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`Schedule getById failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async update(request, response) {
    try {
      const { id } = request.params;
      const schedule = request.body;

      const stillExistFieldsToUpdate = Object.values(schedule).length > 0;
      if (stillExistFieldsToUpdate) {
        await ScheduleModel.updateById(id, schedule);
      }
      return response.status(200).json('OK');
    } catch (err) {
      console.error(`Schedule update failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async delete(request, response) {
    try {
      const { id } = request.params;
      await ScheduleModel.deleteById(id);
      return response.status(200).json("OK");
    } catch (err) {
      console.error(`Schedule delete failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },
};
