const posts = require('../data/posts');

exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE posts RESTART IDENTITY CASCADE;')
    .then(function() {
      return knex('posts').insert(posts);
    })
};
