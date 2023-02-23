const connection = require('../database/connection');

module.exports = {
  async create(schedule) {
    const result = await connection('schedule').insert(schedule);
    return result;
  },

  async getAll() {
    const result = await connection('schedule').select('*');
    return result;
  },

  async getById(id) {
    const result = await connection('schedule')
      .where({ id })
      .select('*')
      .first();
    return result;
  },

  async updateById(id, schedule) {
    const result = await connection('schedule')
      .where({ id })
      .update(schedule);
    return result;
  },

  async deleteById(id) {
    const result = await connection('schedule').where({ id }).delete();
    return result;
  },

  async getByFields(fields) {
    const result = await connection('schedule')
      .where(fields)
      .select('*')
      .first();
    return result;
  },
};
