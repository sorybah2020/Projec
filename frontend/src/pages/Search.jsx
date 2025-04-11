import searchIcon from "../assets/search.svg";
import PropTypes from "prop-types";

const Search = ({
  transactions,
  filteredTransactions,
  setFilteredTransactions,
  setTransLoading,
}) => {
  const handleSearch = (keyword) => {
    console.log("searching for: ", keyword);
    if (keyword.trim() !== "") {
      setTransLoading(true);
      //search by category, paymentmode and description
      const searchResult = transactions.filter((transaction) =>
        ["category", "paymentMode", "description"].some((key) =>
          transaction[key].toLowerCase().includes(keyword.toLowerCase())
        )
      );
      setTimeout(() => {
        setFilteredTransactions(searchResult);
        setTransLoading(false);
      }, 300);
      return;
    }
    setFilteredTransactions(transactions); //get again all available transactions
  };
  return (
    <label className="search-icon">
      <img src={searchIcon} />
      <input
        type="text"
        placeholder="Search"
        className="search-keyword"
        onInput={(e) => handleSearch(e.target.value)}
      />
    </label>
  );
};

Search.propTypes = {
  transactions: PropTypes.array.isRequired,
  filteredTransactions: PropTypes.array.isRequired,
  setFilteredTransactions: PropTypes.func.isRequired,
  setTransLoading: PropTypes.func.isRequired,
};
export default Search;
