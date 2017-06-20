const links = require('../data/links');

exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE links RESTART IDENTITY CASCADE;')
    .then(function() {
      return knex('links').insert(links);
    })
};
