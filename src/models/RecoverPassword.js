const connection = require('../database/connection');

module.exports = {
  async create(recover_password) {
    const result = await connection('recover_password').insert(recover_password);
    return result;
  },

  async getAll() {
    const result = await connection('recover_password').select('*');
    return result;
  },

  async getById(globalUser_id) {
    const result = await connection('recover_password')
      .where({ globalUser_id })
      .select('*')
      .first();
    return result;
  },

  async updateById(globalUser_id, recover_password) {
    const result = await connection('recover_password')
      .where({ globalUser_id })
      .update(recover_password);
    return result;
  },

  async deleteById(globalUser_id) {
    const result = await connection('recover_password').where({ globalUser_id }).delete();
    return result;
  },

  async getByFields(fields) {
    const result = await connection('recover_password')
      .where(fields)
      .select('*')
      .first();
    return result;
  },
};
