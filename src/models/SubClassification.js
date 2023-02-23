const connection = require('../database/connection');

module.exports = {
  async create(subClassification) {
    const result = await connection('subClassification').insert(subClassification);
    return result;
  },

  async getAll() {
    const result = await connection('subClassification').select('*');
    return result;
  },

  async getById(id) {
    const result = await connection('subClassification')
      .where({ id })
      .select('*')
      .first();
    return result;
  },

  async updateById(id, subClassification) {
    const result = await connection('subClassification')
      .where({ id })
      .update(subClassification);
    return result;
  },

  async deleteById(id) {
    const result = await connection('subClassification').where({ id }).delete();
    return result;
  },

  async getByFields(fields) {
    const result = await connection('subClassification')
      .where(fields)
      .select('*');
    return result;
  },
};
