'use client'
import { OrderI } from '@/types'
import React, { useEffect } from 'react'
import { OrderStatus } from '../enums/orderStatus.enum'
import { useGetOrderProductItemsQuery, useUpdateIsPaidMutation } from '@/store/api/orders.api'
import { useAppDispatch } from '@/store/hooks'
import { updateOrder } from '@/store/slice/orders'
import { useRouter } from 'next/navigation'

function OrderWidget(props: OrderI) {
    const [statusColor, setStatusColor] = React.useState<string>('')
    const { id, customer, createdAt, isPaid, orderTotalPrice, currency, status } = props
    const [updateIsPaid, { data }] = useUpdateIsPaidMutation()
    const { data: productItems } = useGetOrderProductItemsQuery(id)
    const dispatch = useAppDispatch()
    const router = useRouter()

    const formatDate = (dateString: string) => {
        // Extract just the date part before any currency info
        const cleanDateString = dateString.split(/[A-Z]{3}[\d.]+$/)[0]
        const date = new Date(cleanDateString)

        const months = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ]

        const day = date.getDate()
        const month = months[date.getMonth()]
        const year = date.getFullYear()

        return `Due ${day} ${month} ${year}`
    }

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        e.stopPropagation()
        updateIsPaid(id)
    }

    const handleOrderClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        router.push(`/${id}/items`)
    }

    useEffect(() => {
        if (data) dispatch(updateOrder(data))
    }, [data, dispatch])

    useEffect(() => {
        console.log({ productItems })
    }, [productItems])

    const handleStatusColor = React.useCallback(() => {
        switch (status) {
            case OrderStatus.PENDING:
                return setStatusColor('bg-yellow-300/40')
            case OrderStatus.SHIPPED:
                return setStatusColor('bg-purple-300/40')
            case OrderStatus.DELIVERED:
                return setStatusColor('bg-green-300/40')
            case OrderStatus.CANCELLED:
                return setStatusColor('bg-red-300/40')
            case OrderStatus.PROCESSING:
                return setStatusColor('bg-orange-300/40')
        }
    }, [status])

    React.useEffect(() => {
        handleStatusColor()
    }, [status, handleStatusColor])

    return (
        <div className='w-full px-4 py-4 md:p-0 bg-[#1E2139] md:bg-transparent rounded-[10px] flex flex-col md:flex-row gap-4 lg:gap-10'>
            <div onClick={handleOrderClick} className='w-full md:bg-[#1E2139] md:p-4 flex flex-col md:flex-row gap-4 md:gap-10 justify-between cursor-pointer hover:bg-[#252945] transition-colors duration-200'>
                <div className='w-full flex items-center justify-between md:w-[30%] gap-4'>
                    <div>
                        <span className='font-bold text-[#9277FF]'>#</span>
                        <span className='font-bold text-white'>{id}</span>
                    </div>
                    <p className='text-white text-[14px] text-nowrap'>{customer.firstName} {customer.lastName}</p>
                </div>

                <div className='w-full flex md:flex-1 justify-between md:ml-[1rem]'>
                    <div className='flex flex-col md:flex-row items-center gap-2'>
                        <span className='text-[#DFE3FA] text-[14px]'>{formatDate(createdAt)}</span>
                        <span className='self-start md:self-center text-white font-semibold'>{currency} {orderTotalPrice}</span>
                    </div>

                    {/* status */}
                    <div className={`${statusColor} text-gray-200/100 font-medium text-[14px] self-center px-6 py-2 rounded-[10px]`}>
                        {status}
                    </div>
                </div>
            </div>

            <button
                onClick={handleClick}
                className={`w-full h-[2.5rem] md:self-center md:w-[10rem]  ${isPaid ? 'bg-gray-500' : 'bg-blue-500 cursor-pointer'} text-white rounded`}
                disabled={isPaid} type="button"
            >
                {isPaid ? 'Paid' : 'Mark as Paid'}
            </button>
        </div>
    )
}

export default OrderWidget