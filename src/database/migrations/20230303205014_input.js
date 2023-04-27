exports.up = function(knex) {
  return knex.schema.createTable("input", (table) => {
    table.string("id").primary().unique().notNullable();
    table.string("cod").notNullable();
    table.string("label").notNullable();
    table.string("helperText");
    table.string("placeholder");
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("input");
};
