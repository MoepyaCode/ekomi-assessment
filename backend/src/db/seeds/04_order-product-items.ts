import { Knex } from "knex";
import { DbTables } from "../enums/tables.enum";
import { getFileData } from "../../utils/helpers/get_data_file";
import { OrderProductItemI } from "../../features/order/order.model";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex.raw(`TRUNCATE TABLE ${DbTables.ORDER_PRODUCT_ITEMS} RESTART IDENTITY CASCADE`);
    const data = await getFileData('order-product-items.json') as OrderProductItemI[];

    // Inserts seed entries
    await knex<OrderProductItemI>(DbTables.ORDER_PRODUCT_ITEMS).insert(data);
};