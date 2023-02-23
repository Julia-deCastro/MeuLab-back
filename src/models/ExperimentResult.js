const connection = require('../database/connection');

module.exports = {
  async create(experimentResult) {
    const result = await connection('result').insert(experimentResult);
    return result;
  },

  async getAll() {
    const result = await connection('result').select('*');
    return result;
  },

  async getById(id) {
    const result = await connection('result')
      .where({ id })
      .select('*')
      .first();
    return result;
  },

  async updateById(id, experimentResult) {
    const result = await connection('result')
      .where({ id })
      .update(experimentResult);
    return result;
  },

  async deleteById(id) {
    const result = await connection('result').where({ id }).delete();
    return result;
  },

  async getByFields(fields) {
    const result = await connection('result')
      .where(fields)
      .select('*')
      .first();
    return result;
  },
};
