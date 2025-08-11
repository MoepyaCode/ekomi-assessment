import { backendUrl } from "@/constants";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

export interface PaginationParams {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    search?: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    meta: {
        page: number;
        limit: number;
        totalItems: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    };
}


const OrdersApiSlice = createApi({
    reducerPath: "ordersApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${backendUrl}/orders`
    }),
    endpoints: (build) => ({
        getAllOrders: build.query({
            query: (params?: PaginationParams) => {
                const searchParams = new URLSearchParams();
                return {
                    url: "/",
                    method: "GET"
                }
            }
        }),
        getOrderById: build.query({
            query: (id: string) => ({
                url: `/${id}`,
                method: "GET"
            })
        }),
        updateIsPaid: build.mutation({
            query: (id: string) => ({
                url: `/${id}/paid`,
                method: "PATCH",
            })
        }),
        getOrderProductItems: build.query({
            query: (orderId: string) => ({
                url: `/${orderId}/items`,
                method: "GET"
            })
        })
    })
})

export const { useGetAllOrdersQuery, useGetOrderByIdQuery, useUpdateIsPaidMutation, useGetOrderProductItemsQuery } = OrdersApiSlice
export default OrdersApiSlice