const connection = require('../database/connection');

module.exports = {
  async create(globalUser) {
    const result = await connection('globalUser').insert(globalUser);
    return result;
  },

  async getAll() {
    const result = await connection('globalUser').select('*');
    return result;
  },

  async getById(id) {
    const result = await connection('globalUser')
      .where({ id })
      .select('*');
    return result;
  },

  async updateById(id, globalUser) {
    const result = await connection('globalUser')
      .where({ id })
      .update(globalUser);
    return result;
  },

  async deleteById(id) {
    const result = await connection('globalUser').where({ id }).delete();
    return result;
  },

  async getByFields(fields) {
    const result = await connection('globalUser')
      .where(fields)
      .select('*')
      .first();
    return result;
  },

  async getByUserName(name) {
    let verify;
    const result = await connection('globalUser')
      .where("user_name", name )
      .select('user_name')
      .first();

    result ? (verify = true) : (verify = false);
    return verify;
  },

  async getByUserEmail(email) {
    let verify;
    const result = await connection('globalUser')
      .where("email", email )
      .select('email')
      .first();

    result ? (verify = true) : (verify = false);
    return verify;
  },

  async getByType(type) {
    const result = await connection('globalUser')
      .where("type", type )
      .select("*");
    return result;
  },
};
