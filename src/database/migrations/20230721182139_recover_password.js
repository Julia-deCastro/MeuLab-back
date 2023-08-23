exports.up = function(knex) {
  return knex.schema.createTable("recover_password", (table) => {
    table.string("globalUser_id").notNullable();
    table.string("code").notNullable();
    table.date("create_in").notNullable();

    table
    .foreign("globalUser_id")
    .references("id")
    .inTable("globalUser")
    .onDelete("cascade");
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("recover_password");
};
