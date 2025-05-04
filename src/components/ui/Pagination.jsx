import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ pagination, totalPages, handlePagination }) => {
  const handlePageChange = (newPage) => {
    handlePagination({ ...pagination, page: newPage });
  };

  return (
    <div className="flex justify-between items-center py-2 px-4">
      {/* Rows per page */}
      <div className="text-xs text-gray-700">
        <label htmlFor="rows-per-page">Items per page:</label>
        <select
          id="rows-per-page"
          className="ml-2 p-1 rounded bg-gray-100 hover:bg-gray-200 text-sm"
          value={pagination.pageSize}
          onChange={(e) =>
            handlePagination({ ...pagination, pageSize: parseInt(e.target.value), page: 1 })
          }
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </select>
      </div>

      {/* Page navigation */}
      <div className="inline-flex items-center space-x-2">
        <button
          onClick={() => handlePageChange(Math.max(pagination.page - 1, 1))}
          className="p-2 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          disabled={pagination.page === 1}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <span className="text-xs text-gray-600">
          Page {pagination.page} of {totalPages}
        </span>

        <button
          onClick={() => handlePageChange(Math.min(pagination.page + 1, totalPages))}
          className="p-2 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          disabled={pagination.page === totalPages}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
