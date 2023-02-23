exports.up = function(knex) {
    return knex.schema.createTable("experiment", (table) => {
      table.string("id").primary().unique().notNullable();
      table.string("title").notNullable();
      table.longtext("description").notNullable();
      table.string("classification").notNullable();
      table.longtext("instructions").notNullable();
      table.string("images").notNullable();
      table.tinyint("featured").defaultTo(0).notNullable();
      table.string("exemplary").notNullable();
      table.string("server_ip").notNullable();
      table.integer("server_port").notNullable();
      table.string("stream_link").notNullable();
      table.time("duration").notNullable();
      table.tinyint("disponibility").defaultTo(1).notNullable();

      table
      .foreign("classification")
      .references("id")
      .inTable("subClassification")
      .onDelete("cascade");
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable("experiment");
  };
  