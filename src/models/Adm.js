const connection = require('../database/connection');

module.exports = {
  async create(adm) {
    const result = await connection('adm').insert(adm);
    return result;
  },

  async getAll() {
    const result = await connection('adm').select('*');
    return result;
  },

  async getById(globalUser_id) {
    const result = await connection('adm')
      .where({ globalUser_id })
      .select('*')
      .first();
    return result;
  },

  async updateById(globalUser_id, adm) {
    const result = await connection('adm')
      .where({ globalUser_id })
      .update(adm);
    return result;
  },

  async deleteById(globalUser_id) {
    const result = await connection('adm').where({ globalUser_id }).delete();
    return result;
  },

  async getByFields(fields) {
    const result = await connection('adm')
      .where(fields)
      .select('*')
      .first();
    return result;
  },
};
