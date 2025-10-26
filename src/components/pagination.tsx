import { Dropdown } from "antd";
import React from "react";

interface PaginationProps {
  current: number;
  total: number;
  pageSize?: number;
  onChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  current,
  total,
  pageSize = 10,
  onChange,
}) => {
  const totalPages = Math.ceil(total / pageSize);

  // Generate page numbers (simple version, can be improved for large sets)
  const getPages = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <>
      <nav
        className="flex items-center justify-end gap-2 mt-4"
        aria-label="Pagination"
      >
        <button
          className="px-3 py-1 rounded-l bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 disabled:opacity-50"
          onClick={() => onChange(current - 1)}
          disabled={current === 1}
        >
          Previous
        </button>
        {getPages().map((page) => (
          <button
            key={page}
            className={`px-3 py-1 border border-gray-300 ${
              page === current
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => onChange(page)}
          >
            {page}
          </button>
        ))}
        <button
          className="px-3 py-1 rounded-r bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 disabled:opacity-50"
          onClick={() => onChange(current + 1)}
          disabled={current === totalPages}
        >
          Next
        </button>
      </nav>
    </>
  );
};

export default Pagination;
