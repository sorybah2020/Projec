import Loader from "../assets/loader.gif";
import PropTypes from "prop-types";

const Spinner = ({ widthVal = "50px" }) => {
  return (
    <div className="spinner">
      <img src={Loader} style={{ width: widthVal }} />
    </div>
  );
};

Spinner.propTypes = {
  widthVal: PropTypes.string.isRequired,
};
export default Spinner;
