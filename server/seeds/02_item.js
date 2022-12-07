/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries

  await knex('item').del()
  await knex('item').insert([
    {id: 1, item_name: 'phone', description: 'device_used_to_make calls', quantity: 15, member_id: 1}
  ]);
};
