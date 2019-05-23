import React from "react";
import PropTypes from "prop-types";

const TextFieldInput = ({
	placeholder,
	name,
	type,
	value,
	onchange,
	disabled,
	errors,
	cols
}) => (
	<div className={`form-group col-md-${cols}`}>
		<input
			type={type}
			className={`form-control form-control-lg ${errors ? "is-invalid" : ""}`}
			placeholder={placeholder}
			name={name}
			value={value}
			onChange={onchange}
			disabled={disabled}
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
	onchange: PropTypes.func,
	cols: PropTypes.number
};

TextFieldInput.defaultProps = {
	type: "text",
	disabled: false,
	onchange: () => {},
	name: "",
	placeholder: "",
	value: "",
	errors: "",
	cols: 12
};

export default TextFieldInput;
