exports.up = function(knex) {
    return knex.schema.createTable("favorite", (table) => {
      table.string("experiment_id").notNullable();
      table.string("user_id").notNullable();

      table
      .foreign("experiment_id")
      .references("id")
      .inTable("experiment")
      .onDelete("cascade");

      table
      .foreign("user_id")
      .references("id")
      .inTable("globalUser")
      .onDelete("cascade");
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable("favorite");
  };
  