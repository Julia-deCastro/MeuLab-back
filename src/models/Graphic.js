const connection = require('../database/connection');

module.exports = {
  async create(graphic) {
    const result = await connection('graphic').insert(graphic);
    return result;
  },

  async getAll() {
    const result = await connection('graphic').select('*');
    return result;
  },

  async getById(id) {
    const result = await connection('graphic')
      .where({ id })
      .select('*')
      .first();
    return result;
  },

  async updateById(id, graphic) {
    const result = await connection('graphic')
      .where({ id })
      .update(graphic);
    return result;
  },

  async deleteById(id) {
    const result = await connection('graphic').where({ id }).delete();
    return result;
  },

  async getByFields(fields) {
    const result = await connection('graphic')
      .where(fields)
      .select('*')
      .first();
    return result;
  },
};
