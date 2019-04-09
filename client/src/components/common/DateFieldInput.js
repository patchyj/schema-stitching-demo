import React from "react";
import PropTypes from "prop-types";

const DateFieldInput = ({ label, name, type, value, onchange, errors }) => {
  return (
    <div className="form-group">
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <label
            className="input-group-text"
            style={errors ? { background: "red !important" } : {}}
          >
            {label}
          </label>
        </div>

        <input
          name={name}
          className={`form-control form-control-lg ${
            errors ? "is-invalid" : ""
          }`}
          value={value}
          type={type}
          onChange={onchange}
        />
        {errors ? <div className="invalid-feedback">{errors}</div> : ""}
      </div>
    </div>
  );
};

DateFieldInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  errors: PropTypes.string,
  type: PropTypes.string,
  due: PropTypes.string,
  onchange: PropTypes.func
};

DateFieldInput.defaultProps = {
  type: "date"
};

export default DateFieldInput;
