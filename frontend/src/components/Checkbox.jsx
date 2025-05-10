import PropTypes from "prop-types";

const Checkbox = ({ name, action, label, checked }) => {
  return (
    <label className="checkbox">
      <input
        type="checkbox"
        name={name}
        onChange={action}
        value={label}
        checked={checked}
      />
      <span className="checkmark"></span>
      {label}
    </label>
  );
};

Checkbox.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  checked: PropTypes.bool,
  action: PropTypes.func,
};
export default Checkbox;
