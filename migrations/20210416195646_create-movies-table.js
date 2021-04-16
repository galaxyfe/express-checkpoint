
exports.up = function(knex) {
    return knex.schema.createTable('movies', table => {
        table.increments();
        table.string('title').notNullable();
        table.integer('runtime');
        table.integer('release_year');
        table.string('director').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('movies');
};
