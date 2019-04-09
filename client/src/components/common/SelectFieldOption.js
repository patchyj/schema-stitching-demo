import React from "react";
import PropTypes from 'prop-types'

const SelectFieldOption = ({ propKey, propValue }) => (
  <option value={propKey.id}>{propKey[propValue]}</option>
);

SelectFieldOption.propTypes = {
  propKey: PropTypes.object.isRequired,
  propValue: PropTypes.string.isRequired
}

export default SelectFieldOption;
