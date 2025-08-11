import db from "../../db";
import { DbTables } from "../../db/enums/tables.enum";
import { ProductI } from "./product.model";


class ProductDAO {

    public getProductById = async (id: string): Promise<ProductI | undefined> => {
        return db<ProductI>(DbTables.PRODUCTS).where({ id }).first();
    }

    public getAllProducts = async (): Promise<ProductI[]> => {
        return db<ProductI>(DbTables.PRODUCTS).select("*");
    }
}

export default ProductDAO;