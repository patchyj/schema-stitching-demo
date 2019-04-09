import React from "react";
import PropTypes from 'prop-types';
import SelectFieldOption from "./SelectFieldOption";

const SelectFieldInput = ({
  name,
  value,
  childrenArray,
  defaultText,
  onchange,
  errors
}) => {

  return (
    <div>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <label
            className="input-group-text"
            htmlFor="inputGroupSelect01"
            style={errors ? { background: "red !important" } : {}}
          >
            Child
          </label>
        </div>
        <select
          className={`custom-select ${errors ? "is-invalid" : ""}`}
          name={name}
          onChange={onchange}
        >
          <option defaultValue>{defaultText}</option>
          {childrenArray &&
            childrenArray.map((child, index) => (
              <SelectFieldOption
                key={index}
                propKey={child}
                propValue={value}
              />
            ))}
        </select>
      </div>
      {errors && <div className="invalid-feedback">{errors}</div>}
    </div>
  );
};

SelectFieldInput.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  childrenArray: PropTypes.array,
  defaultText: PropTypes.string,
  onchange: PropTypes.func,
  errors: PropTypes.string
}

export default SelectFieldInput;
