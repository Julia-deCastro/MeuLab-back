exports.up = function(knex) {
    return knex.schema.createTable("classification", (table) => {
      table.string("id").primary().unique().notNullable();
      table.string("name").notNullable();
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable("classification");
  };
  