const connection = require('../database/connection');

const makeClassificationRelation = (
  classification,
  subClassification_table
) => {
  const classificationRelation = subClassification_table.filter(
    (elements) => elements.classification_id === classification.id
  );
  classification.subClassifications = classificationRelation;
};

module.exports = {
  async create(classification) {
    const result = await connection('classification').insert(classification);
    return result;
  },

  async getAll() {
    const result = await connection('classification').select('*');
    return result;
  },

  async getById(id) {
    const result = await connection('classification')
      .where({ id })
      .select('*')
      .first();
    return result;
  },

  async getAllSub() {
    const classification = await connection('classification')
      .select('*')

      const subClassification = await connection('subClassification')
      .select('*')

      classification?.forEach((classification) => {
        makeClassificationRelation(classification, subClassification);
      });

    return classification;
  },

  async updateById(id, classification) {
    const result = await connection('classification')
      .where({ id })
      .update(classification);
    return result;
  },

  async deleteById(id) {
    const result = await connection('classification').where({ id }).delete();
    return result;
  },

  async getByFields(fields) {
    const result = await connection('classification')
      .where(fields)
      .select('*')
      .first();
    return result;
  },
};
