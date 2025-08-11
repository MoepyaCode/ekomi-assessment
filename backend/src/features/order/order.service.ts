import { CustomerI } from "../customer/customer.model";
import CustomerService from "../customer/customer.service";
import { ProductI } from "../product/product.model";
import ProductService from "../product/product.service";
import OrderDAO from "./dao/order.dao";
import OrderProductItemDAO from "./dao/orderProductItem.dao";
import { OrderStatus } from "./enums/orderStatus.enum";
import { OrderI, OrderPagination, OrderProductItemI } from "./order.model";

/**
 * Service class for handling order-related business logic.
 * Provides methods for retrieving, updating orders and managing order product items.
 */
class OrderService {

    private orderDAO: OrderDAO;
    private orderProductItemDAO: OrderProductItemDAO;
    private customerService: CustomerService;
    private productService: ProductService;

    /**
     * Initializes the OrderService with required DAOs and services.
     */
    constructor() {
        this.orderDAO = new OrderDAO();
        this.orderProductItemDAO = new OrderProductItemDAO();
        this.customerService = new CustomerService();
        this.productService = new ProductService();
    }

    /**
     * Retrieves a single order by its ID.
     * @param id - The unique identifier of the order
     * @returns Promise that resolves to the order object or undefined if not found
     */
    public getOrderById = async (id: string): Promise<OrderI | undefined> => {
        return this.orderDAO.getOrderById(id);
    }

    /**
     * Retrieves all orders with customer information included.
     * Replaces the customerId field with the full customer object.
     * @returns Promise that resolves to an array of orders with customer details
     */
    public getAllOrders = async (): Promise<((Omit<OrderI, 'customerId'> & { customer: CustomerI | undefined })[])> => {
        const orders = await this.orderDAO.getAllOrders();

        return Promise.all(orders.map(async order => {
            const { customerId, ...rest } = order
            const customer = await this.customerService.getCustomerById(order.customerId);
            return {
                ...rest,
                customer
            };
        }))
    }

    /**
     * Updates the payment status of an order to paid.
     * @param id - The unique identifier of the order to update
     * @returns Promise that resolves to the updated order with customer information
     */
    public updateIsPaid = async (id: string): Promise<Omit<OrderI, 'customerId'> & { customer: CustomerI | undefined }> => {
        const order = (await this.orderDAO.updateIsPaid(id))[0];
        return this.getOrderResponse(order);
    }

    /**
     * Helper method to format order response by replacing customerId with customer object.
     * @param order - The order object to format
     * @returns Promise that resolves to the formatted order with customer details
     */
    private getOrderResponse = async (order: OrderI) => {
        const { customerId, ...rest } = order
        const customer = await this.customerService.getCustomerById(order.customerId);
        return {
            ...rest,
            customer
        };
    }

    /**
     * Retrieves all product items for a specific order with product details included.
     * Replaces the productId field with the full product object for each item.
     * @param orderId - The unique identifier of the order
     * @returns Promise that resolves to an array of order items with product details
     */
    public getOrderItemsByOrderId = async (orderId: string): Promise<(Omit<OrderProductItemI, 'productId'> & {product: ProductI | undefined})[]> => {
        const items = await this.orderProductItemDAO.getOrderItemsByOrderId(orderId);

        return Promise.all(items.map(async item => {
            const product = await this.productService.getProductById(item.productId);
            const { productId, ...rest } = item
            return {
                ...rest,
                product
            };
        }));
    }
}

export default OrderService