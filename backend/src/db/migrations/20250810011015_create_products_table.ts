import type { Knex } from "knex";
import { DbTables } from "../enums/tables.enum";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(DbTables.PRODUCTS, (table) => {
        table.string('id').primary()
        table.string('name').notNullable()
        table.decimal('price', 10, 2).notNullable()
        table.string('description').notNullable()
        table.string('category').notNullable()
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(DbTables.PRODUCTS);
}