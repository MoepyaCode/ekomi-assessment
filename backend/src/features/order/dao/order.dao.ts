import db from "../../../db";
import { DbTables } from "../../../db/enums/tables.enum";
import { OrderStatus } from "../enums/orderStatus.enum";
import { OrderI } from "../order.model";

class OrderDAO {
    public getOrderById = async (id: string): Promise<OrderI | undefined> => {
        return db<OrderI>(DbTables.ORDERS).where({ id }).first();
    }

    public getAllOrders = async (): Promise<OrderI[]> => {
        return db<OrderI>(DbTables.ORDERS).select("*");
    }


    public updateIsPaid = async (id: string): Promise<OrderI[]> => {
        return db<OrderI>(DbTables.ORDERS).where({ id }).update({ isPaid: true }).returning('*');
    }

    public getOrdersByIsPaid = async (isPaid: boolean): Promise<OrderI[]> => {
        return db<OrderI>(DbTables.ORDERS).where({ isPaid }).select("*");
    }

    public getOrdersByStatus = async (status: OrderStatus): Promise<OrderI[]> => {
        return db<OrderI>(DbTables.ORDERS).where({ status }).select("*");
    }
}

export default OrderDAO;
