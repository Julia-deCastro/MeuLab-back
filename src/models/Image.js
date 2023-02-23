const connection = require('../database/connection');

module.exports = {
  async create(image) {
    const result = await connection('image').insert(image);
    return result;
  },

  async getAll() {
    const result = await connection('image').select('*');
    return result;
  },

  async getById(experiment_id) {
    const result = await connection('image')
      .where({ experiment_id })
      .select('*')
      .first();
    return result;
  },

  async updateById(experiment_id, image) {
    const result = await connection('image')
      .where({ experiment_id })
      .update(image);
    return result;
  },

  async deleteById(experiment_id) {
    const result = await connection('image').where({ experiment_id }).delete();
    return result;
  },

  async getByFields(fields) {
    const result = await connection('image')
      .where(fields)
      .select('*')
      .first();
    return result;
  },
};
