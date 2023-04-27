exports.up = function(knex) {
  return knex.schema.createTable("exp_input_relation", (table) => {
    table.string("experiment_id").notNullable();
    table.string("input_id").notNullable();

    table
    .foreign("experiment_id")
    .references("id")
    .inTable("experiment")
    .onDelete("cascade");

    table
    .foreign("input_id")
    .references("id")
    .inTable("input")
    .onDelete("cascade");
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("exp_input_relation");
};
