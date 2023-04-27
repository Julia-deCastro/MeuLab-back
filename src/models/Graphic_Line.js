const connection = require('../database/connection');

module.exports = {
  async create(graphic_line) {
    const result = await connection('graphic_line').insert(graphic_line);
    return result;
  },

  async getAll() {
    const result = await connection('graphic_line').select('*');
    return result;
  },

  async getById(graphic_id) {
    const result = await connection('graphic_line')
      .where({ graphic_id })
      .select('*')
      .first();
    return result;
  },

  async updateById(graphic_id, graphic_line) {
    const result = await connection('graphic_line')
      .where({ graphic_id })
      .update(graphic_line);
    return result;
  },

  async deleteById(graphic_id) {
    const result = await connection('graphic_line').where({ graphic_id }).delete();
    return result;
  },

  async getByFields(fields) {
    const result = await connection('graphic_line')
      .where(fields)
      .select('*')
      .first();
    return result;
  },
};
