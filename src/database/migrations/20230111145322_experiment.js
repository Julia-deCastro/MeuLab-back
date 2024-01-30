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
      table.string("server_ip");
      table.integer("server_port");
      table.string("stream_link");
      table.time("duration").notNullable();
      table.tinyint("disponibility").defaultTo(1).notNullable();
      table.string("layout");
      table.string("gweb_link");
      table.date("create_in").notNullable();

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
  