import React from "react";
import PropTypes from "prop-types";

const TimeFieldInput = ({ label, name, type, value, onchange, errors }) => {
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

TimeFieldInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  errors: PropTypes.string,
  type: PropTypes.string,
  due: PropTypes.string,
  onchange: PropTypes.func.isRequired
};

TimeFieldInput.defaultProps = {
  type: "time"
};

export default TimeFieldInput;
