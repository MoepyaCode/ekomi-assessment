import db from "../../db";
import { CustomerI } from "./customer.model";
import { DbTables } from "../../db/enums/tables.enum";

class CustomerDAO {

    constructor() {}

    public getCustomerById = async (id: string): Promise<CustomerI | undefined> => {
        return db<CustomerI>(DbTables.CUSTOMERS).where({ id }).first();
    }

    public getAllCustomers = async (): Promise<CustomerI[]> => {
        return db<CustomerI>(DbTables.CUSTOMERS).select("*");
    }
}

export default CustomerDAO