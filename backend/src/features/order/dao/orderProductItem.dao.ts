import db from "../../../db";
import { DbTables } from "../../../db/enums/tables.enum";
import { OrderProductItemI } from "../order.model";

class OrderProductItemDAO {
    public getOrderItemsByOrderId = async (orderId: string): Promise<OrderProductItemI[]> => {
        return db<OrderProductItemI>(DbTables.ORDER_PRODUCT_ITEMS).where({ orderId });
    }
}

export default OrderProductItemDAO;