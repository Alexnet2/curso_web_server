import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
    knex.schema.createTable('categories', (table) => {
        table.string('name')
    })
}

export async function down(knex: Knex): Promise<void> {
    knex.schema.dropTable('categories')
}
