const connection = require('../database/connection');

module.exports = {
  async create(user) {
    const result = await connection('user').insert(user);
    return result;
  },

  async getAll() {
    const result = await connection('user')
      .innerJoin("globalUser", "user.globalUser_id", "globalUser.id")
      .distinct()
      .select('*');
    return result;
  },

  async getById(globalUser_id) {
    const result = await connection('user')
      .innerJoin("globalUser", "user.globalUser_id", "globalUser.id")
      .distinct()
      .where({ globalUser_id })
      .select('*')
      .first();
    return result;
  },

  async updateById(globalUser_id, user) {
    const result = await connection('user')
      .where({ globalUser_id })
      .update(user);
    return result;
  },

  async deleteById(globalUser_id) {
    const result = await connection('user').where({ globalUser_id }).delete();
    return result;
  },

  async getByFields(fields) {
    const result = await connection('user')
      .innerJoin("globalUser", "user.globalUser_id", "globalUser.id")
      .distinct()
      .where(fields)
      .select('*');
    return result;
  },

  async getBySituation(fields) {
    const result = await connection('user')
      .innerJoin("globalUser", "user.globalUser_id", "globalUser.id")
      .distinct()
      .where(fields)
      .select('*');
    return result;
  },
};
