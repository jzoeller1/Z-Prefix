/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries

  await knex('item').del()
  await knex('item').insert([
    {id: 1, item_name: 'phone', description: 'device used to make calls', quantity: 15, member_id: 1},
    {id: 2, item_name: 'computer', description: 'standard gov computer', quantity: 9, member_id: 2}
  ]);
};
