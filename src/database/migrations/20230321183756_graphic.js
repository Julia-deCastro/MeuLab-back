exports.up = function(knex) {
  return knex.schema.createTable("graphic", (table) => {
    table.string("experiment_id").notNullable();
    table.string("id").primary().unique().notNullable();
    table.string("title").notNullable();
    table.string("type").notNullable();
    table.string("xTitle").notNullable();
    table.string("yTitle").notNullable();
    table.string("zTitle");
    table.string("xInputCod").notNullable();
    table.string("zInputCod");
    table.string("colorScale");

    table
    .foreign("experiment_id")
    .references("id")
    .inTable("experiment")
    .onDelete("cascade");
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("graphic");
};
