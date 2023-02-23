exports.up = function(knex) {
  return knex.schema.createTable("adm", (table) => {
    table.string("globalUser_id").notNullable();
    table.text("permission");

    table
    .foreign("globalUser_id")
    .references("id")
    .inTable("globalUser")
    .onDelete("cascade");
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("adm");
};
