/* eslint-disable prettier/prettier */
const AdmModel = require('../models/Adm');
require('dotenv').config();

module.exports = {
  async create(request, response) {
    try {
      const administrator = request.body;

      await AdmModel.create(administrator);
      return response.status(201).json({ id: administrator.globalUser_id });
    } catch (err) {
      console.error(`Administrator creation failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async getAll(request, response) {
    try {
      const result = await AdmModel.getAll();

      return response.status(200).json(result);
    } catch (err) {
      console.error(`Administrator getAll failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async getById(request, response) {
    try {
      const { globalUser_id } = request.params;
      const result = await AdmModel.getById(globalUser_id);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`Administrator getById failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async update(request, response) {
    try {
      const { globalUser_id } = request.params;
      const administrator = request.body;

      const stillExistFieldsToUpdate = Object.values(administrator).length > 0;
      if (stillExistFieldsToUpdate) {
        await AdmModel.updateById(globalUser_id, administrator);
      }
      return response.status(200).json('OK');
    } catch (err) {
      console.error(`Administrator update failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async delete(request, response) {
    try {
      const { globalUser_id } = request.params;
      await AdmModel.deleteById(globalUser_id);
      return response.status(200).json("OK");
    } catch (err) {
      console.error(`Administrator delete failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },
};
