import React from "react";
import PropTypes from "prop-types";

const ToggleReadOnly = ({ readOnly, onToggleRead }) => {
	return (
		<div className="text-center text-white my-5 col-md-4 offset-md-4 toggle-toolbar">
			<div className="row">
				<div className="col-md-4">
					<div className="btn profile-btn btn-circle">
						<div className="fas fa-plus" />
					</div>
				</div>
				<div className="col-md-4">
					<label className="switch">
						<input type="checkbox" checked={readOnly} onChange={onToggleRead} />
						<span className="slider round" />
					</label>
				</div>
				<div className="col-md-4">
					{!readOnly && <div className="btn profile-btn">Save</div>}
				</div>
			</div>
		</div>
	);
};

ToggleReadOnly.propTypes = {
	readOnly: PropTypes.bool,
	onToggleRead: PropTypes.func
};

export default ToggleReadOnly;
