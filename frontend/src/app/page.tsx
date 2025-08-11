'use client'
import { Screen } from "@/components";
import { OrdersList } from "@/features/orders";
import { useGetAllOrdersQuery } from "@/store/api/orders.api";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setOrders } from "@/store/slice/orders";
import { OrderI } from "@/types";
import { useEffect } from "react";

export default function Home() {
  const { data: orderData, error: orderError, isLoading: orderLoading } = useGetAllOrdersQuery(undefined)
  const dispatch = useAppDispatch()
  const orders = useAppSelector(state => state.OrdersSlice)

  useEffect(() => {
    if(orders.length > 0){
      dispatch(setOrders(orders))
    }

    if(orderData) {
      dispatch(setOrders(orderData))
    }
  }, [orderData, dispatch])

  return (
    <Screen>
      <div className="w-full flex flex-col gap-[2rem] md:max-w-[95%] lg:max-w-[75%]">
        <div className="">
          <h1 className="font-bold text-2xl text-white">Orders Dashboard</h1>
          <p className="text-gray-400">Manage and view all orders</p>
        </div>

        <OrdersList
          orders={(orders as OrderI[]) || []}
          isLoading={orderLoading}
          error={orderError}
          enableClientSidePagination={true}
          initialItemsPerPage={10}
          enableSearch={true}
          enableSorting={true}
          enableFiltering={true}
        />
      </div>
    </Screen>
  );
} 