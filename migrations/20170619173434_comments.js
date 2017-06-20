
exports.up = function(knex, Promise) {
  return knex.schema.createTable('comments', (table)=>{
      table.increments('id').primary()
       table.timestamp('posted_on').defaultTo(knex.fn.now()).notNull()
      table.text('content').notNull()
      table.integer('post_id').references('posts.id').unsigned().onDelete('cascade')
      table.integer('user_id').references('users.id').unsigned().onDelete('cascade')
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('comments')
};
