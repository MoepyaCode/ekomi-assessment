import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { APIs } from "./api";
import OrdersSlice from "./slice/orders";

const store = configureStore({
    reducer: {
        [APIs.orders.reducerPath]: APIs.orders.reducer,
        OrdersSlice: OrdersSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
        logger,
        APIs.orders.middleware,
    ]),
})

type AppStore = typeof store
export type AppDispatch = AppStore["dispatch"];
export type AppSelector = ReturnType<AppStore["getState"]>;

export default store;