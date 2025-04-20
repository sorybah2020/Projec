import PropTypes from "prop-types";
import { NavigationContext } from "./NavigationContext";
import { useState } from "react";

const NavigationProvider = ({ children }) => {
  const [sidebarOpened, setSidebarOpened] = useState({
    filters: false,
    profile: false,
  });

  const handleOpenFilters = () => {
    setSidebarOpened({
      ...sidebarOpened,
      filters: !sidebarOpened.filters,
    });
  };

  const handleOpenProfile = () => {
    setSidebarOpened({
      ...sidebarOpened,
      profile: !sidebarOpened.profile,
    });
  };

  return (
    <NavigationContext.Provider
      value={{ handleOpenFilters, handleOpenProfile, sidebarOpened }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

NavigationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default NavigationProvider;
