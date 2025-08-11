import { Knex } from "knex";
import { DbTables } from "../enums/tables.enum";
import { getFileData } from "../../utils/helpers/get_data_file";
import { CustomerI } from "../../features/customer/customer.model";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex.raw(`TRUNCATE TABLE ${DbTables.CUSTOMERS} RESTART IDENTITY CASCADE`);
    const data = await getFileData('customers.json') as CustomerI[];

    // Inserts seed entries
    await knex<CustomerI>(DbTables.CUSTOMERS).insert(data);
};
