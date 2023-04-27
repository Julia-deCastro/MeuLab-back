const connection = require('../database/connection');
const { getAll } = require('./Experiment');

const makeExpRelation = (
  schedule,
  exp_table,
) => {
  const expRelation = exp_table.filter(
    (elements) => elements.id === schedule.experiment_id
  );
  schedule.exp = expRelation;
};

const makeResultRelation = (
  schedule,
  result_table,
) => {
  const expRelation = result_table.filter(
    (elements) => elements.schedule_id === schedule.id
  );
  schedule.result = expRelation;
};

const makeUserRelation = (
  schedule,
  user_table,
) => {
  const expRelation = user_table.filter(
    (elements) => elements.id === schedule.user_id
  );
  schedule.user = expRelation;
};

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

  async getByExperiment(fields) {
    const result = await connection('schedule')
      .where(fields)
      .select('*')
      .orderBy('date', 'desc');
    const exps = await getAll();
    const results = await connection('result').select('*');

    result?.forEach((schedule) => {
      makeExpRelation(schedule, exps);
      if (schedule.status === 'done') {
        makeResultRelation(schedule, results);
      }
    });

    return result;
  },

  async getByExpUser(fields) {
    const result = await connection('schedule')
      .where(fields)
      .select('*')
      .orderBy('hour', 'asc');;
    const user = await connection('globalUser').select('name', 'id');

    result?.forEach((schedule) => {
      makeUserRelation(schedule, user);
    });

    return result;
  },

  async getByFields(fields) {
    const result = await connection('schedule')
      .where(fields)
      .select('*');
    return result;
  },
};
