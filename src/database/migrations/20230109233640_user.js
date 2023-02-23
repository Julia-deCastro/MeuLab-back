exports.up = function(knex) {
    return knex.schema.createTable("user", (table) => {
    table.string("globalUser_id").notNullable();
    table.string("profession").notNullable();
    table.string("instituition");
    table.enu("type_instituition", ["public", "private"]);
    table.string("country").notNullable();
    table.string("state").notNullable();
    table.string("city").notNullable();
    table.text("purpose_use").notNullable();
    table.tinyint("status").defaultTo(0).notNullable();
    table.tinyint("aprove").defaultTo(0).notNullable();

    table
    .foreign("globalUser_id")
    .references("id")
    .inTable("globalUser")
    .onDelete("cascade");
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("user");
};
