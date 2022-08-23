import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
    knex.schema.createTable('articles', (table) => {
        table.string('name')
    })
}

export async function down(knex: Knex): Promise<void> {
    knex.schema.dropTable('articles')
}
