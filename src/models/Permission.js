const connection = require('../database/connection');

module.exports = {
  async create(permission) {
    const result = await connection('permission').insert(permission);
    return result;
  },

  async getAll() {
    const result = await connection('permission').select('*');
    return result;
  },

  async getById(id) {
    const result = await connection('permission')
      .where({ id })
      .select('*')
      .first();
    return result;
  },

  async updateById(id, permission) {
    const result = await connection('permission')
      .where({ id })
      .update(permission);
    return result;
  },

  async deleteById(id) {
    const result = await connection('permission').where({ id }).delete();
    return result;
  },

  async getByFields(fields) {
    const result = await connection('permission')
      .where(fields)
      .select('*')
      .first();
    return result;
  },
};
