import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = 5;

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex justify-center items-center mt-16 mb-10">

      <div className="flex items-center gap-3">

        {/* Previous */}

        <button
          onClick={() =>
            currentPage > 1 && handlePageChange(currentPage - 1)
          }
          disabled={currentPage === 1}
          className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md transition duration-300
            ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white hover:bg-[#C62828] hover:text-white"
            }`}
        >
          <ChevronLeft size={20} />
        </button>

        {/* Page Numbers */}

        {[...Array(totalPages)].map((_, index) => {
          const page = index + 1;

          return (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`w-12 h-12 rounded-full font-semibold transition duration-300 shadow-md
                ${
                  currentPage === page
                    ? "bg-[#C62828] text-white"
                    : "bg-white hover:bg-[#C62828] hover:text-white"
                }`}
            >
              {page}
            </button>
          );
        })}

        {/* Next */}

        <button
          onClick={() =>
            currentPage < totalPages &&
            handlePageChange(currentPage + 1)
          }
          disabled={currentPage === totalPages}
          className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md transition duration-300
            ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white hover:bg-[#C62828] hover:text-white"
            }`}
        >
          <ChevronRight size={20} />
        </button>

      </div>

    </div>
  );
};

export default Pagination;