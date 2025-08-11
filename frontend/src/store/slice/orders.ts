import { OrderI } from "@/types"
import { createSlice } from "@reduxjs/toolkit"
import { PayloadAction } from "@reduxjs/toolkit/react"

const initialState: OrderI[] = []

const OrdersSlice = createSlice({
    name: "orders-state",
    initialState,
    reducers: {
        setOrders: (state, action: PayloadAction<OrderI[]>) => {
            return action.payload
        },
        updateOrder: (state, action: PayloadAction<OrderI>) => {
            const index = state.findIndex(order => order.id === action.payload.id)
            if (index !== -1) {
                state[index] = action.payload
            }
        }
    }
})

export const { setOrders, updateOrder } = OrdersSlice.actions
export default OrdersSlice