exports.up = function(knex) {
    return knex.schema.createTable("comment", (table) => {
      table.string("id").primary().unique().notNullable();
      table.string("user_id").notNullable();
      table.longtext("text").notNullable();
      table.tinyint("favorite").defaultTo(0).notNullable();

      table
      .foreign("user_id")
      .references("id")
      .inTable("globalUser")
      .onDelete("cascade");
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable("comment");
  };
  