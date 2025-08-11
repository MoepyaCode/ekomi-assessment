import { OrderStatus } from "@/features/orders/enums/orderStatus.enum"
import { CustomerI } from "./customers"
import { ProductI } from "./products"

export interface OrderI {
    id: string
    customer: CustomerI
    status: OrderStatus
    orderTotalPrice: number 
    currency: string
    isPaid: boolean
    createdAt: string
    updatedAt: string
}

export interface OrderProductItemI {
    id: number
    orderId: string
    product: ProductI
    quantity: number
    itemTotalPrice: string | number
}