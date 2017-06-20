
exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts', (table)=>{
      table.increments('id').primary()
       table.timestamp('posted_on').defaultTo(knex.fn.now()).notNull()
      table.text('title').notNull()
      table.text('content').notNull()
      table.integer('user_id').references('users.id').unsigned().onDelete('cascade')
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('posts')
};
