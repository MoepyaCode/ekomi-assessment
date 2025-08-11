import { OrderStatus } from "./enums/orderStatus.enum"

export interface OrderI {
    id: string
    customerId: string
    status: OrderStatus
    orderTotalPrice: number 
    currency: string
    isPaid: boolean
    createdAt: string
    updatedAt: string
}

export interface OrderProductItemI {
    orderId: string
    productId: string
    quantity: number
    itemTotalPrice: number
}

export type OrderPagination = {
    totalPages: number;
    itemsPerPage: number;
    totalOrdersNo: number;
    currentPage: number;
    offset: number;
}