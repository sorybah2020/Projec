import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

const DatePicker = ({ dispatch }) => {
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
      color: "#759df5",
    },
  ]);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close date picker when clicking outside
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setOpen(false);
    }
  };

  const handleSetDate = (selection) => {
    setRange([selection]); //set the range to the selected date
    dispatch({
      //dispatch to action SET_DATE
      type: "SET_DATE",
      payload: {
        startDate: format(selection.startDate, "yyyy-MM-dd"),
        endDate: format(selection.endDate, "yyyy-MM-dd"),
      },
    });
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <label className="filter-title">Select a range</label>
      <div className="filter-date-section" ref={ref}>
        <div className="filter-date">
          <input
            type="text"
            onClick={() => setOpen(!open)}
            className="date-picker"
            readOnly
            value={`${format(range[0].startDate, "dd/MM/yyyy")} - ${format(
              range[0].endDate,
              "dd/MM/yyyy"
            )}`}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20px"
            viewBox="0 -960 960 960"
            width="20px"
            fill="#5f6368"
            className="date-icon"
          >
            <path d="M320-400q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm160 0q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm160 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z" />
          </svg>
        </div>

        {open && (
          <div className="date-picker-container">
            <DateRange
              editableDateInputs={true}
              onChange={(item) => handleSetDate(item.selection)}
              moveRangeOnFirstSelection={false}
              ranges={range}
            />
          </div>
        )}
      </div>
    </>
  );
};

DatePicker.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default DatePicker;
