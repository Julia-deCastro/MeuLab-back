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

const makeInputRelation = (
  exp,
  input_table,
) => {
  const inputRelation = input_table.filter(
    (elements) => elements.experiment_id === exp.id
  );
  exp.inputs = inputRelation;
};

const makeInputsRelation = (
  ip,
  input_table,
) => {
  const inputRelation = input_table.filter(
    (elements) => elements.id === ip.input_id
  );
  ip.ip = inputRelation;
};

const makeGraphicRelation = (
  exp,
  graphic_table,
) => {
  const graphicRelation = graphic_table.filter(
    (elements) => elements.experiment_id === exp.id
  );
  exp.graphic = graphicRelation;
};

const makeLinesRelation = (
  graph,
  line_table,
) => {
  const lineRelation = line_table.filter(
    (elements) => elements.graphic_id === graph.id
  );
  graph.curve = lineRelation;
};

module.exports = {
  async create(experiment) {
    const result = await connection('experiment').insert(experiment);
    return result;
  },

  async getAll() {
    const result = await connection('experiment').select('*');
    const images = await connection('image').select('*');
    const inputs = await connection('exp_input_relation').select('*');
    const input = await connection('input').select('*');
    const graphic = await connection('graphic').select('*');
    const line = await connection('graphic_line').select('*');

    result?.forEach((exps) => {
      makeImageRelation(exps, images);
    });
    result?.forEach((exps) => {
      makeInputRelation(exps, inputs);
    });
    result?.forEach((exp) => {
      exp?.inputs.forEach((ip) => {
        makeInputsRelation(ip, input);
      })
    });
    result?.forEach((exp) => {
      makeGraphicRelation(exp, graphic);
    })
    result?.forEach((exp) => {
      exp?.graphic.forEach((graph) => {
        makeLinesRelation(graph, line);
      })
    })

    return result;
  },

  async getById(id) {
    const result = await connection('experiment')
      .where({ id })
      .select('*')
      .first();
    const images = await connection('image').select('*');
    const inputs = await connection('exp_input_relation').select('*');

    result?.forEach((exps) => {
      makeImageRelation(exps, images);
    });

    result?.forEach((exps) => {
      makeInputRelation(exps, inputs);
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
    const inputs = await connection('exp_input_relation').select('*');

    exps?.forEach((exps) => {
      makeClassificationRelation(exps, subCla);
    });
    exps?.forEach((exps) => {
      makeImageRelation(exps, images);
    });
    exps?.forEach((exps) => {
      makeInputRelation(exps, inputs);
    });

    return exps;
  },

  async getByFields(fields) {
    const exps = await connection('experiment')
      .where(fields)
      .select('*');

    const subCla = await connection('subClassification').select('*');
    const images = await connection('image').select('*');
    const inputs = await connection('exp_input_relation').select('*');

    exps?.forEach((exps) => {
      makeClassificationRelation(exps, subCla);
    });
    exps?.forEach((exps) => {
      makeImageRelation(exps, images);
    });
    exps?.forEach((exps) => {
      makeInputRelation(exps, inputs);
    });

    return exps;
  },
};
