import PropTypes from "prop-types";
import { useState } from "react";

const Pagination = ({ transactions, children }) => {
  const rowsPerPage = 5;

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(transactions.length / rowsPerPage);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = transactions.slice(indexOfFirstRow, indexOfLastRow);

  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      {children(currentRows)}
      {/* Pagination Controls */}
      <div className="pagination">
        <button onClick={() => changePage(1)} disabled={currentPage === 1}>
          |&lt;
        </button>
        <button
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt;
        </button>

        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          let pageNumber = Math.max(1, currentPage - 2) + i;
          if (pageNumber > totalPages) return null;
          return (
            <button
              key={pageNumber}
              onClick={() => changePage(pageNumber)}
              className={currentPage === pageNumber ? "active" : ""}
            >
              {pageNumber}
            </button>
          );
        })}

        <button
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
        <button
          onClick={() => changePage(totalPages)}
          disabled={currentPage === totalPages}
        >
          &gt;|
        </button>
      </div>

      <div className="page-info">
        Page {currentPage} of {totalPages} ({transactions.length} items)
      </div>
    </>
  );
};

Pagination.propTypes = {
  transactions: PropTypes.array.isRequired,
  children: PropTypes.node,
};
export default Pagination;
