import React from "react";
import PropTypes from "prop-types";

const TextFieldInput = ({
	placeholder,
	name,
	value,
	onchange,
	disabled,
	errors,
	cols,
	rows
}) => (
	<div className={`form-group col-md-${cols}`}>
		<textarea
			name={name}
			placeholder={placeholder}
			className={`form-control form-control-lg ${errors ? "is-invalid" : ""}`}
			rows={rows}
			onChange={onchange}
			disabled={disabled}
			defaultValue={value}
		/>
		{errors && <div className="invalid-feedback">{errors}</div>}
	</div>
);

TextFieldInput.propTypes = {
	name: PropTypes.string,
	placeholder: PropTypes.string,
	value: PropTypes.string,
	errors: PropTypes.string,
	type: PropTypes.string,
	disabled: PropTypes.bool,
	onchange: PropTypes.func.isRequired,
	cols: PropTypes.number,
	rows: PropTypes.number
};

TextFieldInput.defaultProps = {
	type: "text",
	disabled: false,
	name: "",
	placeholder: "",
	value: "",
	errors: "",
	cols: 12,
	rows: 7
};

export default TextFieldInput;
