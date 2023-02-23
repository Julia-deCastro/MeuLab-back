const connection = require('../database/connection');

module.exports = {
  async create(favorite) {
    const result = await connection('favorite').insert(favorite);
    return result;
  },

  async getAll() {
    const result = await connection('favorite').select('*');
    return result;
  },

  async getById(user_id) {
    const result = await connection('favorite')
      .where({ user_id })
      .select('*');
    return result;
  },

  async deleteById(user_id, experiment_id) {
    const result = await connection('favorite').where({ user_id }).where({ experiment_id }).delete();
    return result;
  },
};
