exports.up = function(knex) {
  return knex.schema.createTable("graphic_line", (table) => {
    table.string("graphic_id").notNullable();
    table.string("name").notNullable();
    table.string("color");
    table.string("inputCod").notNullable();
    table.string("calculation");

    table
    .foreign("graphic_id")
    .references("id")
    .inTable("graphic")
    .onDelete("cascade");
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("graphic_line");
};
