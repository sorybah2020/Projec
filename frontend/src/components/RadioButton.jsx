import PropTypes from "prop-types";

const RadioButton = ({ label, name, action }) => {
  return (
    <label className="radio">
      <input type="radio" name={name} onChange={action} value={label} />
      <span className="checkmark"></span>
      {label}
    </label>
  );
};

RadioButton.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  action: PropTypes.func,
};
export default RadioButton;
