import type { Knex } from "knex";
import { DbTables } from "../enums/tables.enum";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(DbTables.ORDER_PRODUCT_ITEMS, (table) => {
        table.increments('id').primary();
        table.string('orderId').notNullable().references('id').inTable(DbTables.ORDERS)
        table.string('productId').notNullable().references('id').inTable(DbTables.PRODUCTS)
        table.integer('quantity').notNullable()
        table.decimal('itemTotalPrice', 10, 2).notNullable()
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(DbTables.ORDER_PRODUCT_ITEMS);
}