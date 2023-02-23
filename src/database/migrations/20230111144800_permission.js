exports.up = function(knex) {
    return knex.schema.createTable("permission", (table) => {
      table.string("id").primary().unique().notNullable();
      table.string("name").notNullable();
      table.string("method_name").notNullable();
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable("permission");
  };
  