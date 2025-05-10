import searchIcon from "../assets/search.svg";
import { useContext } from "react";
import { TransactionsContext } from "../context/TransactionsContext";

const Search = () => {
  const { setKeyword, setTransLoading } = useContext(TransactionsContext);
  const handleKeywordChange = (value) => {
    setTransLoading(true); // start loading
    setKeyword(value);
  };
  return (
    <label className="search-icon">
      <img src={searchIcon} className="search-icon" />
      <input
        type="text"
        placeholder="Search"
        className="search-keyword"
        onInput={(e) => handleKeywordChange(e.target.value)}
      />
    </label>
  );
};

export default Search;
