import React from "react";

export function Pagination({
  currentPage,
  itemsPerPage,
  totalItems,
  onPageChange,
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (newPage) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    onPageChange(newPage);
  };

  return (
    <div className="pagination z-20">
      <ul className="inline-flex justify-center -space-x-px text-sm">
        <button
          className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white sm:mr-2 sm:mb-2"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white sm:mr-2 sm:mb-2">
          Page {currentPage}
        </span>
        {currentPage !== totalPages && (
          <>
            <button
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white sm:mr-2 sm:mb-2"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </>
        )}
        {currentPage !== 1 && (
          <button
            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white sm:mr-2 sm:mb-2"
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          >
            First Page
          </button>
        )}
      </ul>
    </div>
  );
}
