'use client'
import { useGetOrderProductItemsQuery } from '@/store/api/orders.api'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { OrderProductItemI } from '@/types/orders'
import Breadcrumb from '@/components/Breadcrumb'

function OrderItemsPage() {
    const params = useParams()
    const router = useRouter()
    const orderId = params.orderId as string
    
    const { data: productItems, isLoading, error } = useGetOrderProductItemsQuery(orderId)

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#141625] flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#9277FF] mx-auto mb-4"></div>
                    <div className="text-white text-xl">Loading order items...</div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#141625] flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-500 text-xl mb-4">Error loading order items</div>
                    <button
                        onClick={() => router.back()}
                        className="px-4 py-2 bg-[#9277FF] text-white rounded hover:bg-purple-600 transition-colors"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#141625] p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                {/* Breadcrumb Navigation */}
                <Breadcrumb orderId={orderId} />
                
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => router.back()}
                            className="text-white hover:text-gray-300 text-2xl transition-colors"
                            title="Go back"
                        >
                            ←
                        </button>
                        <h1 className="text-2xl md:text-3xl font-bold text-white">
                            Order Items
                        </h1>
                    </div>
                </div>

                {/* Product Items List */}
                <div className="space-y-4">
                    {productItems && productItems.length > 0 ? (
                        productItems.map((item: OrderProductItemI) => (
                            <div
                                key={item.id}
                                className="bg-[#1E2139] rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-colors duration-200"
                            >
                                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                                    <div className="flex-1">
                                        <div className="flex items-start gap-3 mb-3">
                                            <div className="bg-[#9277FF]/20 text-[#9277FF] px-3 py-1 rounded-full text-sm font-bold">
                                                #{item.id}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-white font-semibold text-lg mb-1">
                                                    {item.product.name}
                                                </h3>
                                                <p className="text-gray-300 text-sm leading-relaxed">
                                                    {item.product.description}
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                                            <div className="bg-[#252945] rounded-lg p-3">
                                                <span className="text-gray-400 font-medium block mb-1">Category</span>
                                                <span className="text-white">{item.product.category}</span>
                                            </div>
                                            <div className="bg-[#252945] rounded-lg p-3">
                                                <span className="text-gray-400 font-medium block mb-1">Product ID</span>
                                                <span className="text-white font-mono text-xs break-all">
                                                    {item.product.id}
                                                </span>
                                            </div>
                                            <div className="bg-[#252945] rounded-lg p-3">
                                                <span className="text-gray-400 font-medium block mb-1">Order ID</span>
                                                <span className="text-white">{item.orderId}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="lg:flex-shrink-0">
                                        <div className="grid grid-cols-3 lg:grid-cols-1 gap-4 lg:gap-3 lg:w-32">
                                            <div className="text-center lg:text-right">
                                                <div className="text-gray-400 text-xs uppercase tracking-wide mb-1">Quantity</div>
                                                <div className="text-white font-bold text-lg">
                                                    {item.quantity}
                                                </div>
                                            </div>
                                            
                                            <div className="text-center lg:text-right">
                                                <div className="text-gray-400 text-xs uppercase tracking-wide mb-1">Unit Price</div>
                                                <div className="text-white font-bold">
                                                    ${typeof item.product.price === 'string' ? item.product.price : item.product.price.toFixed(2)}
                                                </div>
                                            </div>
                                            
                                            <div className="text-center lg:text-right">
                                                <div className="text-gray-400 text-xs uppercase tracking-wide mb-1">Total</div>
                                                <div className="text-[#9277FF] font-bold text-lg">
                                                    ${typeof item.itemTotalPrice === 'string' ? item.itemTotalPrice : item.itemTotalPrice.toFixed(2)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="bg-[#1E2139] rounded-lg p-8 text-center">
                            <div className="text-gray-400 text-lg">
                                No items found for this order
                            </div>
                        </div>
                    )}
                </div>

                {/* Summary */}
                {productItems && productItems.length > 0 && (
                    <div className="mt-8 bg-[#1E2139] rounded-lg p-6">
                        <h3 className="text-white font-bold text-lg mb-4">Order Summary</h3>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400">Total Items:</span>
                            <span className="text-white font-bold">
                                {productItems.reduce((total: number, item: OrderProductItemI) => total + item.quantity, 0)}
                            </span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                            <span className="text-gray-400">Total Value:</span>
                            <span className="text-[#9277FF] font-bold text-lg">
                                ${productItems.reduce((total: number, item: OrderProductItemI) => {
                                    const itemTotal = typeof item.itemTotalPrice === 'string' 
                                        ? parseFloat(item.itemTotalPrice) 
                                        : item.itemTotalPrice;
                                    return total + itemTotal;
                                }, 0).toFixed(2)}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default OrderItemsPage
