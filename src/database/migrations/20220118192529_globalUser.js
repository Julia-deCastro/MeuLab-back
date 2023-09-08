exports.up = function(knex) {
  return knex.schema.createTable("globalUser", (table) => {
    table.string("id").primary().unique().notNullable();
    table.string("name").notNullable();
    table.string("email").unique().notNullable();
    table.string("user_name").unique().notNullable();
    table.text("password").notNullable();
    table.string("type").defaultTo("user");
    table.date("create_in").notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("globalUser");
};
