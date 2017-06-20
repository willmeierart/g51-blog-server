const comments = require('../data/comments');

exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE comments RESTART IDENTITY CASCADE;')
    .then(function() {
      return knex('comments').insert(comments);
    })
};
