import { Knex } from "knex";
import { DbTables } from "../enums/tables.enum";
import { getFileData } from "../../utils/helpers/get_data_file";
import { ProductI } from "../../features/product/product.model";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex.raw(`TRUNCATE TABLE ${DbTables.PRODUCTS} RESTART IDENTITY CASCADE`);
    const data = await getFileData('products.json') as ProductI[];

    // Inserts seed entries
    await knex<ProductI>(DbTables.PRODUCTS).insert(data);
};