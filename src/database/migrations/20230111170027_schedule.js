exports.up = function(knex) {
    return knex.schema.createTable("schedule", (table) => {
      table.string("id").primary().unique().notNullable();
      table.string("experiment_id").notNullable();
      table.string("user_id").notNullable();
      table.date("date").notNullable();
      table.time("hour").notNullable();
      table.tinyint("wating_confirmation").defaultTo(0).notNullable();
      table.enu("status", ["done", "abandoned", "unrealized"]);
      table.date("create_in").notNullable();

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
    return knex.schema.dropTable("schedule");
  };
  