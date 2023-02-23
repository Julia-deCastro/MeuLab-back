exports.up = function(knex) {
    return knex.schema.createTable("subClassification", (table) => {
      table.string("id").primary().unique().notNullable();
      table.string("classification_id").notNullable();
      table.string("name").notNullable();
      table.string("description").notNullable();

      table
      .foreign("classification_id")
      .references("id")
      .inTable("classification")
      .onDelete("cascade");
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable("subClassification");
  };
  