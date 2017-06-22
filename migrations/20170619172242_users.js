
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table)=>{
      table.increments('id').primary()
      table.text('name')
      table.text('email').notNull().unique()
      table.text('username').unique()
      table.text('password').notNull()
      table.timestamp('created_at').defaultTo(knex.fn.now()).notNull()
      table.boolean('is_active').notNull().defaultTo(true)
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users')
};
