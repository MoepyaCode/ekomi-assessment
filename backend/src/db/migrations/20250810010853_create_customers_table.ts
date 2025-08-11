import type { Knex } from "knex";
import { DbTables } from "../enums/tables.enum";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(DbTables.CUSTOMERS, (table) => {
        table.string('id').primary()
        table.string('firstName').notNullable()
        table.string('lastName').notNullable()
        table.string('email').notNullable().unique()
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(DbTables.CUSTOMERS);
}