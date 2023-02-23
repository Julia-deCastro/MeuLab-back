const connection = require('../database/connection');

const makeClassificationRelation = (
  exp,
  subClassification_table,
) => {
  const classificationRelation = subClassification_table.filter(
    (elements) => elements.id === exp.classification
  );
  exp.subClasse = classificationRelation;
};

const makeImageRelation = (
  exp,
  image_table,
) => {
  const imageRelation = image_table.filter(
    (elements) => elements.experiment_id === exp.id
  );
  exp.images = imageRelation;
};

module.exports = {
  async create(experiment) {
    const result = await connection('experiment').insert(experiment);
    return result;
  },

  async getAll() {
    const result = await connection('experiment').select('*');
    const images = await connection('image').select('*');

    result?.forEach((exps) => {
      makeImageRelation(exps, images);
    });

    return result;
  },

  async getById(id) {
    const result = await connection('experiment')
      .where({ id })
      .select('*')
      .first();
    const images = await connection('image').select('*');

    result?.forEach((exps) => {
      makeImageRelation(exps, images);
    });

    return result;
  },

  async updateById(id, experiment) {
    const result = await connection('experiment')
      .where({ id })
      .update(experiment);
    return result;
  },

  async deleteById(id) {
    const result = await connection('experiment').where({ id }).delete();
    return result;
  },

  async getByClassification() {
    const exps = await connection('experiment').select('*');
    const subCla = await connection('subClassification').select('*');
    const images = await connection('image').select('*');

    exps?.forEach((exps) => {
      makeClassificationRelation(exps, subCla);
    });
    exps?.forEach((exps) => {
      makeImageRelation(exps, images);
    });

    return exps;
  },

  async getByFields(fields) {
    const exps = await connection('experiment')
      .where(fields)
      .select('*');

    const subCla = await connection('subClassification').select('*');
    const images = await connection('image').select('*');

    exps?.forEach((exps) => {
      makeClassificationRelation(exps, subCla);
    });
    exps?.forEach((exps) => {
      makeImageRelation(exps, images);
    });

    return exps;
  },
};
