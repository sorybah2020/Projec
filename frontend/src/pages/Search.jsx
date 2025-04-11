import searchIcon from "../assets/search.svg";
import PropTypes from "prop-types";

const Search = ({ setKeyword }) => {
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

Search.propTypes = {
  setKeyword: PropTypes.func.isRequired,
};
export default Search;
