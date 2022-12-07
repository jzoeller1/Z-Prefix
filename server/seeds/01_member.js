/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex.schema.raw('TRUNCATE member CASCADE')
  await knex('member').del()
  await knex('member').insert([
    {id: 1, first_name: 'John', last_name: 'Doe', username: 'j.Doe', password: 'password'},
    {id: 2, first_name: 'Jane', last_name: 'Doe', username: 'j.Doe2', password: 'password'}
  ]);
};
