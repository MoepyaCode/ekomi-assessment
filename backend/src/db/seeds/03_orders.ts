import { Knex } from "knex";
import { DbTables } from "../enums/tables.enum";
import { getFileData } from "../../utils/helpers/get_data_file";
import { OrderI } from "../../features/order/order.model";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex.raw(`TRUNCATE TABLE ${DbTables.ORDERS} RESTART IDENTITY CASCADE`);
    const data = await getFileData('orders.json') as OrderI[];

    // Inserts seed entries
    await knex<OrderI>(DbTables.ORDERS).insert(data);
};