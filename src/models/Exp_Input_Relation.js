const connection = require('../database/connection');
const { getById } = require('./Input');

const makeInputRelation = (
  inputs,
  input_table,
) => {
  const inputRelation = input_table.filter(
    (elements) => elements.id === inputs.id
  );
  inputs.ip = inputRelation;
};

module.exports = {
  async create(exp_input_relation) {
    const result = await connection('exp_input_relation').insert(exp_input_relation);
    return result;
  },

  async getAll() {
    const result = await connection('exp_input_relation').select('*');
    return result;
  },

  async getById(experiment_id) {
    const result = await connection('exp_input_relation')
      .where({ experiment_id })
      .select('*');
    return result;
  },

  async getInputById(experiment_id) {
    const result = await connection('exp_input_relation')
      .where({ experiment_id })
      .select('*');

    const input = getById(experiment_id);
    result?.forEach((inputs) => {
      makeInputRelation(inputs, input);
    });
    
    return result;
  },

  async deleteById(experiment_id, input_id) {
    const result = await connection('exp_input_relation').where({ experiment_id }).where({ input_id }).delete();
    return result;
  },
};
