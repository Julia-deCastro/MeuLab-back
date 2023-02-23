/* eslint-disable prettier/prettier */
const { v4: uuidv4 } = require('uuid');
const PermissionModel = require('../models/Permission');


module.exports = {
  async create(request, response) {
    try {
      const permission = request.body;
      permission.id = uuidv4();
      await PermissionModel.create(permission);
      return response.status(201).json({ id: permission.id });
    } catch (err) {
      console.error(`Permission creation failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async getAll(request, response) {
    try {
      const result = await PermissionModel.getAll();
      return response.status(200).json(result);
    } catch (err) {
      console.error(`Permission getAll failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async getById(request, response) {
    try {
      const { id } = request.params;
      const result = await PermissionModel.getById(id);
      return response.status(200).json(result);
    } catch (err) {
      console.error(`Permission getById failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async update(request, response) {
    try {
      const { id } = request.params;
      const permission = request.body;

      const stillExistFieldsToUpdate = Object.values(permission).length > 0;
      if (stillExistFieldsToUpdate) {
        await PermissionModel.updateById(id, permission);
      }
      return response.status(200).json('OK');
    } catch (err) {
      console.error(`Permission update failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },

  async delete(request, response) {
    try {
      const { id } = request.params;
      await PermissionModel.deleteById(id);
      return response.status(200).json("OK");
    } catch (err) {
      console.error(`Permission delete failed: ${err}`);
      return response.status(500).json({
        notification: 'Internal server error',
      });
    }
  },
};
