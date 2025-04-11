import prevIcon from "../assets/prev.svg";
import firstPage from "../assets/first_page.svg";
import nextPage from "../assets/next_page.svg";
import lastPage from "../assets/last_page.svg";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const Pagination = ({ filteredTransactions, setCurrentRows, rowsPerPage }) => {
  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredTransactions?.length / rowsPerPage);

  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  useEffect(() => {
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredTransactions?.slice(
      indexOfFirstRow,
      indexOfLastRow
    );
    setCurrentRows(currentRows);
    if (filteredTransactions?.length == rowsPerPage) {
      setCurrentPage(1);
    }
  }, [currentPage, filteredTransactions, rowsPerPage, setCurrentRows]);

  return (
    <>
      {/* Pagination Controls */}
      <div className="pagination">
        <div className="pagination-nav">
          <button onClick={() => changePage(1)} disabled={currentPage === 1}>
            <img src={firstPage} alt="First Page" />
          </button>
          <button
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <img src={prevIcon} alt="Previous Page" />
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
            className="next-button"
          >
            <img src={nextPage} alt="Next Page" />
          </button>
          <button
            onClick={() => changePage(totalPages)}
            disabled={currentPage === totalPages}
            className="next-button"
          >
            <img src={lastPage} alt="Last Page" />
          </button>
        </div>
        <div className="page-info">
          {currentPage} of {totalPages} pages ({filteredTransactions?.length}{" "}
          items)
        </div>
      </div>
    </>
  );
};

Pagination.propTypes = {
  filteredTransactions: PropTypes.array.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  setCurrentRows: PropTypes.func.isRequired,
};
export default Pagination;
