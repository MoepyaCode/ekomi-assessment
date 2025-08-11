import type { Knex } from "knex";
import { DbTables } from "../enums/tables.enum";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(DbTables.ORDERS, (table) => {
        table.string('id').primary()
        table.string('customerId').notNullable().references('id').inTable(DbTables.CUSTOMERS)
        table.string('status').notNullable()
        table.decimal('orderTotalPrice', 10, 2).notNullable()
        table.string('currency').notNullable()
        table.boolean('isPaid').defaultTo(false)
        table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now())
        table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now())
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(DbTables.ORDERS);
}