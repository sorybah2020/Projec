import Toggle from "../assets/toggle.svg";
import FiltersIcon from "../assets/filter.svg";
import { NavigationContext } from "../context/NavigationContext";
import { useContext } from "react";

const Header = () => {
  const { sidebarOpened, handleOpenProfile, handleOpenFilters } =
    useContext(NavigationContext);

  return (
    <header>
      <div className="top-navigation">
        <div className="top-navigation-left">
          <img
            src={Toggle}
            className="toggleIcon"
            style={{ opacity: sidebarOpened.profile ? 0 : 1 }}
            onClick={handleOpenProfile}
          />
          <h1>E-tracker</h1>
        </div>
        <img
          src={FiltersIcon}
          className="filtersIcon"
          style={{ opacity: sidebarOpened.filters ? 0 : 1 }}
          onClick={handleOpenFilters}
        />
      </div>
    </header>
  );
};

export default Header;
