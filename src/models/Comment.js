const connection = require('../database/connection');

module.exports = {
  async create(comment) {
    const result = await connection('comment').insert(comment);
    return result;
  },

  async getAll() {
    const result = await connection('comment').select('*');
    return result;
  },

  async getById(id) {
    const result = await connection('comment')
      .where({ id })
      .select('*')
      .first();
    return result;
  },

  async updateById(id, comment) {
    const result = await connection('comment')
      .where({ id })
      .update(comment);
    return result;
  },

  async deleteById(id) {
    const result = await connection('comment').where({ id }).delete();
    return result;
  },

  async getByFields(fields) {
    const result = await connection('comment')
      .where(fields)
      .select('*')
      .first();
    return result;
  },
};
