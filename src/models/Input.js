const connection = require('../database/connection');

module.exports = {
  async create(input) {
    const result = await connection('input').insert(input);
    return result;
  },

  async getAll() {
    const result = await connection('input').select('*');
    return result;
  },

  async getById(id) {
    const result = await connection('input')
      .where({ id })
      .select('*')
      .first();
    return result;
  },

  async updateById(id, input) {
    const result = await connection('input')
      .where({ id })
      .update(input);
    return result;
  },

  async deleteById(id) {
    const result = await connection('input').where({ id }).delete();
    return result;
  },

  async getByFields(fields) {
    const result = await connection('input')
      .where(fields)
      .select('*')
      .first();
    return result;
  },

  async getByCod(id) {
    let verify;
    const result = await connection('input')
      .where("id", id )
      .select('id')
      .first();

    result ? (verify = true) : (verify = false);
    return verify;
  },
};
