import searchIcon from "../assets/search.svg";
import { useContext } from "react";
import { TransactionsContext } from "../context/TransactionsContext";

const Search = () => {
  const { setKeyword } = useContext(TransactionsContext);

  return (
    <label className="search-icon">
      <img src={searchIcon} />
      <input
        type="text"
        placeholder="Search"
        className="search-keyword"
        onInput={(e) => setKeyword(e.target.value)}
      />
    </label>
  );
};

export default Search;
