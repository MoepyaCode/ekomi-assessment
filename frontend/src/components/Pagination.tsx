'use client'
import React, { useState, useEffect } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  startIndex: number;
  endIndex: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  onPageChange: (page: number) => void;
  onNextPage: () => void;
  onPreviousPage: () => void;
  onFirstPage: () => void;
  onLastPage: () => void;
  onItemsPerPageChange: (items: number) => void;
  maxVisiblePages?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  startIndex,
  endIndex,
  hasNextPage,
  hasPreviousPage,
  onPageChange,
  onNextPage,
  onPreviousPage,
  onFirstPage,
  onLastPage,
  onItemsPerPageChange,
  maxVisiblePages = 5,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Use fewer visible pages on mobile
  const responsiveMaxPages = isMobile ? 3 : maxVisiblePages;

  const getVisiblePages = () => {
    if (totalPages <= responsiveMaxPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const half = Math.floor(responsiveMaxPages / 2);
    let start = Math.max(1, currentPage - half);
    const end = Math.min(totalPages, start + responsiveMaxPages - 1);

    if (end - start + 1 < responsiveMaxPages) {
      start = Math.max(1, end - responsiveMaxPages + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const visiblePages = getVisiblePages();
  const itemsPerPageOptions = [5, 10, 20, 50];

  if (totalPages <= 1) return null;

  return (
    <div className="w-full flex flex-col gap-4 p-3 sm:p-4 bg-[#1E2139] rounded-lg">
      {/* Items info and per-page selector */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm text-gray-300">
        <span className="text-center sm:text-left">
          Showing {startIndex + 1}-{endIndex} of {totalItems} orders
        </span>
        
        <div className="flex items-center justify-center sm:justify-end gap-2">
          <span className="whitespace-nowrap">Show:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            className="bg-[#2B2F48] text-white px-2 py-1 rounded border border-gray-600 focus:border-[#9277FF] focus:outline-none text-sm"
          >
            {itemsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <span className="whitespace-nowrap">per page</span>
        </div>
      </div>

      {/* Pagination controls */}
      <div className="flex items-center justify-center gap-1 sm:gap-2 overflow-x-auto pb-1">
        {/* First page */}
        <button
          onClick={onFirstPage}
          disabled={!hasPreviousPage}
          className="px-2 sm:px-3 py-1 rounded bg-[#2B2F48] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#9277FF] transition-colors text-sm whitespace-nowrap"
          title="First page"
        >
          ««
        </button>

        {/* Previous page */}
        <button
          onClick={onPreviousPage}
          disabled={!hasPreviousPage}
          className="px-2 sm:px-3 py-1 rounded bg-[#2B2F48] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#9277FF] transition-colors text-sm whitespace-nowrap"
          title="Previous page"
        >
          ‹
        </button>

        {/* Page numbers */}
        <div className="flex items-center gap-1">
          {visiblePages[0] > 1 && (
            <>
              <button
                onClick={() => onPageChange(1)}
                className="px-2 sm:px-3 py-1 rounded bg-[#2B2F48] text-white hover:bg-[#9277FF] transition-colors text-sm whitespace-nowrap"
              >
                1
              </button>
              {visiblePages[0] > 2 && (
                <span key="start-ellipsis" className="px-1 sm:px-2 text-gray-400 text-sm">...</span>
              )}
            </>
          )}

          {visiblePages.map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-2 sm:px-3 py-1 rounded transition-colors text-sm whitespace-nowrap ${
                page === currentPage
                  ? 'bg-[#9277FF] text-white'
                  : 'bg-[#2B2F48] text-white hover:bg-[#9277FF]'
              }`}
            >
              {page}
            </button>
          ))}

          {visiblePages[visiblePages.length - 1] < totalPages && (
            <>
              {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
                <span key="end-ellipsis" className="px-1 sm:px-2 text-gray-400 text-sm">...</span>
              )}
              <button
                onClick={() => onPageChange(totalPages)}
                className="px-2 sm:px-3 py-1 rounded bg-[#2B2F48] text-white hover:bg-[#9277FF] transition-colors text-sm whitespace-nowrap"
              >
                {totalPages}
              </button>
            </>
          )}
        </div>

        {/* Next page */}
        <button
          onClick={onNextPage}
          disabled={!hasNextPage}
          className="px-2 sm:px-3 py-1 rounded bg-[#2B2F48] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#9277FF] transition-colors text-sm whitespace-nowrap"
          title="Next page"
        >
          ›
        </button>

        {/* Last page */}
        <button
          onClick={onLastPage}
          disabled={!hasNextPage}
          className="px-2 sm:px-3 py-1 rounded bg-[#2B2F48] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#9277FF] transition-colors text-sm whitespace-nowrap"
          title="Last page"
        >
          »»
        </button>
      </div>
    </div>
  );
};

export default Pagination;
