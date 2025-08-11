'use client'
import React, { useState, useMemo } from 'react';
import { OrderWidget } from '@/features/orders';
import { Pagination } from '@/components';
import { usePagination } from '@/store/hooks';
import { OrderI } from '@/types';

interface OrdersListProps {
    orders: OrderI[];
    isLoading?: boolean;
    error?: unknown;
    enableClientSidePagination?: boolean;
    initialItemsPerPage?: number;
    enableSearch?: boolean;
    enableSorting?: boolean;
    enableFiltering?: boolean;
}

type SortField = 'createdAt' | 'orderTotalPrice' | 'status' | 'customer';
type SortOrder = 'asc' | 'desc';
type PaymentFilter = 'all' | 'paid' | 'unpaid';

const OrdersList: React.FC<OrdersListProps> = ({
    orders,
    isLoading = false,
    error = null,
    enableClientSidePagination = true,
    initialItemsPerPage = 10,
    enableSearch = true,
    enableSorting = true,
    enableFiltering = true,
}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortField, setSortField] = useState<SortField>('createdAt');
    const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
    const [paymentFilter, setPaymentFilter] = useState<PaymentFilter>('all');

    // Filter and sort orders based on search, payment status, and sort criteria
    const filteredAndSortedOrders = useMemo(() => {
        let result = [...orders];

        // Apply search filter
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(order =>
                order.id.toLowerCase().includes(query) ||
                `${order.customer.firstName} ${order.customer.lastName}`.toLowerCase().includes(query) ||
                order.status.toLowerCase().includes(query) ||
                order.currency.toLowerCase().includes(query)
            );
        }

        // Apply payment status filter
        if (paymentFilter !== 'all') {
            result = result.filter(order => {
                if (paymentFilter === 'paid') return order.isPaid;
                if (paymentFilter === 'unpaid') return !order.isPaid;
                return true;
            });
        }

        // Apply sorting
        result.sort((a, b) => {
            let aValue: string | number;
            let bValue: string | number;

            switch (sortField) {
                case 'createdAt':
                    aValue = new Date(a.createdAt).getTime();
                    bValue = new Date(b.createdAt).getTime();
                    break;
                case 'orderTotalPrice':
                    aValue = a.orderTotalPrice;
                    bValue = b.orderTotalPrice;
                    break;
                case 'status':
                    aValue = a.status;
                    bValue = b.status;
                    break;
                case 'customer':
                    aValue = `${a.customer.firstName} ${a.customer.lastName}`;
                    bValue = `${b.customer.firstName} ${b.customer.lastName}`;
                    break;
                default:
                    return 0;
            }

            if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });

        return result;
    }, [orders, searchQuery, sortField, sortOrder, paymentFilter]);

    const {
        currentPage,
        totalPages,
        totalItems,
        currentItems,
        itemsPerPage,
        startIndex,
        endIndex,
        hasNextPage,
        hasPreviousPage,
        goToPage,
        goToNextPage,
        goToPreviousPage,
        goToFirstPage,
        goToLastPage,
        setItemsPerPage,
    } = usePagination({
        data: filteredAndSortedOrders,
        itemsPerPage: initialItemsPerPage,
        initialPage: 1,
    });

    const handleSortChange = (field: SortField) => {
        if (field === sortField) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
    };

    const getSortIcon = (field: SortField) => {
        if (field !== sortField) return '↕️';
        return sortOrder === 'asc' ? '↑' : '↓';
    };

    if (isLoading) {
        return (
            <div className="w-full flex justify-center items-center py-12">
                <div className="text-white text-lg">Loading orders...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full flex justify-center items-center py-12">
                <div className="text-red-400 text-lg">Error loading orders</div>
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col gap-6">
            {/* Search, Filter, and Sort Controls */}
            {(enableSearch || enableSorting || enableFiltering) && (
                <div className="w-full flex flex-col gap-4 p-3 sm:p-4 bg-[#1E2139] rounded-lg">
                    {/* Search and Filter Row */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        {enableSearch && (
                            <div className="flex-1">
                                <input
                                    type="text"
                                    placeholder="Search orders by ID, customer, or status..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full px-3 sm:px-4 py-2 bg-[#2B2F48] text-white rounded-lg border border-gray-600 focus:border-[#9277FF] focus:outline-none text-sm"
                                />
                            </div>
                        )}

                        {enableFiltering && (
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                <span className="text-white text-sm whitespace-nowrap">Payment:</span>
                                <select
                                    value={paymentFilter}
                                    onChange={(e) => setPaymentFilter(e.target.value as PaymentFilter)}
                                    className="px-3 py-2 bg-[#2B2F48] text-white rounded-lg border border-gray-600 focus:border-[#9277FF] focus:outline-none text-sm"
                                >
                                    <option value="all">All Orders</option>
                                    <option value="paid">Paid Only</option>
                                    <option value="unpaid">Unpaid Only</option>
                                </select>
                            </div>
                        )}
                    </div>

                    {enableSorting && (
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                            <span className="text-white md:self-center text-sm whitespace-nowrap">Sort by:</span>

                            {/* Mobile: Dropdown for very small screens */}
                            <div className="block sm:hidden">
                                <select
                                    value={`${sortField}-${sortOrder}`}
                                    onChange={(e) => {
                                        const [field, order] = e.target.value.split('-') as [SortField, SortOrder];
                                        setSortField(field);
                                        setSortOrder(order);
                                    }}
                                    className="w-full px-3 py-2 bg-[#2B2F48] text-white rounded-lg border border-gray-600 focus:border-[#9277FF] focus:outline-none text-sm"
                                >
                                    <option value="createdAt-desc">Date (Newest first)</option>
                                    <option value="createdAt-asc">Date (Oldest first)</option>
                                    <option value="orderTotalPrice-desc">Amount (High to Low)</option>
                                    <option value="orderTotalPrice-asc">Amount (Low to High)</option>
                                    <option value="status-asc">Status (A-Z)</option>
                                    <option value="status-desc">Status (Z-A)</option>
                                    <option value="customer-asc">Customer (A-Z)</option>
                                    <option value="customer-desc">Customer (Z-A)</option>
                                </select>
                            </div>

                            {/* Desktop/Tablet: Button layout */}
                            <div className="hidden sm:flex flex-wrap gap-1 md:gap-2">
                                {(['createdAt', 'orderTotalPrice', 'status', 'customer'] as SortField[]).map((field) => (
                                    <button
                                        key={field}
                                        onClick={() => handleSortChange(field)}
                                        className={`px-2 md:px-3 py-2 rounded text-xs md:text-sm transition-colors whitespace-nowrap ${field === sortField
                                                ? 'bg-[#9277FF] text-white'
                                                : 'bg-[#2B2F48] text-gray-300 hover:bg-[#9277FF]'
                                            }`}
                                    >
                                        {field === 'createdAt' && 'Date'}
                                        {field === 'orderTotalPrice' && 'Amount'}
                                        {field === 'status' && 'Status'}
                                        {field === 'customer' && 'Customer'}
                                        <span className="ml-1">{getSortIcon(field)}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Orders Count */}
            <div className="text-gray-400">
                {searchQuery || paymentFilter !== 'all' ? (
                    <p>
                        Found {totalItems} order{totalItems !== 1 ? 's' : ''}
                        {searchQuery && ` matching "${searchQuery}"`}
                        {paymentFilter !== 'all' && ` (${paymentFilter === 'paid' ? 'paid' : 'unpaid'} only)`}
                        {totalItems !== orders.length && ` of ${orders.length} total`}
                    </p>
                ) : (
                    <p>Total Orders: {totalItems}</p>
                )}
            </div>

            {/* Orders List */}
            {totalItems > 0 ? (
                <>
                    <ul className="w-full flex flex-col gap-6">
                        {currentItems.map((order) => (
                            <OrderWidget key={order.id} {...order} />
                        ))}
                    </ul>

                    {/* Pagination */}
                    {enableClientSidePagination && totalPages > 1 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalItems={totalItems}
                            itemsPerPage={itemsPerPage}
                            startIndex={startIndex}
                            endIndex={endIndex}
                            hasNextPage={hasNextPage}
                            hasPreviousPage={hasPreviousPage}
                            onPageChange={goToPage}
                            onNextPage={goToNextPage}
                            onPreviousPage={goToPreviousPage}
                            onFirstPage={goToFirstPage}
                            onLastPage={goToLastPage}
                            onItemsPerPageChange={setItemsPerPage}
                        />
                    )}
                </>
            ) : (
                <div className="text-center text-gray-400 py-12">
                    {searchQuery || paymentFilter !== 'all'
                        ? 'No orders found matching your criteria.'
                        : 'No orders found.'}
                </div>
            )}
        </div>
    );
};

export default OrdersList;
