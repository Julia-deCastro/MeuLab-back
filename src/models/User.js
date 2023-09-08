const connection = require('../database/connection');
const { getById } = require('./Favorite');

const makeFavRelation = (
  user,
  favorite_table,
) => {
  const favoriteRelation = favorite_table.filter(
    (elements) => elements.user_id === user.id
  );
  user.favorites = favoriteRelation;
};

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

    const favorite = getById(result.id);
    result?.forEach((user) => {
      makeFavRelation(user, favorite);
    });

    return result;
  },

  async getById(globalUser_id) {
    const result = await connection('user')
      .innerJoin("globalUser", "user.globalUser_id", "globalUser.id")
      .distinct()
      .where({ globalUser_id })
      .select('*')
      .first();

    const favorite = await getById(globalUser_id);
    makeFavRelation(result, favorite);

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

  async getCountByCountry() {
    const result = await connection('user')
      .select('country')
      .count('globalUser_id as user_count')
      .groupBy('country');
  
      const countries = result.map(entry => entry.country);
      const userCounts = result.map(entry => entry.user_count);
    
      return { countries, userCounts };
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
