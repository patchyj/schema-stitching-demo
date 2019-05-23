import React from "react";
import PropTypes from "prop-types";

const DateFieldInput = ({
	label,
	name,
	type,
	value,
	onChange,
	errors,
	cols,
	disabled
}) => {
	return (
		<div className="form-group">
			<div className="input-group">
				<div className="input-group-prepend">
					{label && (
						<label
							className="input-group-text"
							style={errors ? { background: "red !important" } : {}}
						>
							{label}
						</label>
					)}
				</div>

				<input
					name={name}
					className={`form-control form-control-lg ${errors ? "is-invalid" : ""}`}
					value={value}
					type={type}
					onChange={onChange}
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
	onChange: PropTypes.func,
	disabled: PropTypes.bool,
	cols: PropTypes.number
};

DateFieldInput.defaultProps = {
	type: "date",
	disabled: false,
	name: "",
	onChange: () => {},
	placeholder: "",
	value: "",
	errors: "",
	cols: 12
};

export default DateFieldInput;
