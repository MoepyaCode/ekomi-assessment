'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

interface BreadcrumbProps {
    orderId: string
}

function Breadcrumb({ orderId }: BreadcrumbProps) {
    const router = useRouter()

    return (
        <nav className="flex items-center space-x-2 text-sm mb-6">
            <button
                onClick={() => router.push('/')}
                className="text-[#9277FF] hover:text-purple-300 transition-colors"
            >
                Orders
            </button>
            <span className="text-gray-400">/</span>
            <span className="text-white font-medium">Order #{orderId}</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-300">Items</span>
        </nav>
    )
}

export default Breadcrumb
