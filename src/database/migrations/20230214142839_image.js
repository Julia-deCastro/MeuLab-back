exports.up = function(knex) {
  return knex.schema.createTable("image", (table) => {
    table.string("experiment_id").notNullable();
    table.string("image").notNullable();

    table
    .foreign("experiment_id")
    .references("id")
    .inTable("experiment")
    .onDelete("cascade");
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("image");
};
