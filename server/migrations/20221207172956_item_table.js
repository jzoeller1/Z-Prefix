/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('item', table => {
    table.increments();
    table.string('item_name', 250)
    table.string('description', 1000)
    table.integer('quantity')
    table.integer('member_id')
    table.foreign('member_id').references('member.id')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('item', table => {
    table.dropForeign('member_id')
  })
  .then(function() {
    return knex.schema.dropTableIfExists('item');
  });
};
