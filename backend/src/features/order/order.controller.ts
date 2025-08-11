import { NextFunction, Request, Response } from "express";
import OrderService from "./order.service";

/**
 * Controller for order endpoints.
 */
class OrderController {
    private readonly orderService: OrderService;

    constructor() {
        this.orderService = new OrderService();
    }

    /**
     * GET /orders/:id - Get order by ID.
     */
    getOrderById = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const { id } = request.params;
            const order = await this.orderService.getOrderById(id);
            if (!order) {
                return response.status(404).json({ message: "Order not found" });
            }
            return response.json(order);
        } catch (error) {
            next(error);
        }
    }

    /**
     * GET /orders - Get all orders.
     */
    getAllOrders = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const orders = await this.orderService.getAllOrders();
            return response.json(orders);
        } catch (error) {
            next(error);
        }
    }

    /**
     * PATCH /orders/:id/pay - Update order payment status.
     */
    updateIsPaid = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const { id } = request.params;
            const updatedOrder = await this.orderService.updateIsPaid(id);
            return response.json(updatedOrder);
        } catch (error) {
            next(error);
        }
    }

    /**
     * GET /orders/:orderId/items - Get order items by order ID.
     */
    getOrderItemsByOrderId = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const { orderId } = request.params;
            const items = await this.orderService.getOrderItemsByOrderId(orderId);
            return response.json(items);
        } catch (error) {
            next(error);
        }
    }
}

export default OrderController;