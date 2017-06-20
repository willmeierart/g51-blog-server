
exports.up = function(knex, Promise) {
  return knex.schema.createTable('links', (table)=>{
      table.increments('id').primary()
      table.text('url').notNull()
      table.text('description')
      table.integer('user_id').references('users.id').unsigned().onDelete('cascade')
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('links')
};
