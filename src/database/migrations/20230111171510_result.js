exports.up = function(knex) {
    return knex.schema.createTable("result", (table) => {
      table.string("id").primary().unique().notNullable();
      table.string("schedule_id").notNullable();
      table.string("result").notNullable();
      table.date("create_in").notNullable();

      table
      .foreign("schedule_id")
      .references("id")
      .inTable("schedule")
      .onDelete("cascade");
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable("result");
  };
  