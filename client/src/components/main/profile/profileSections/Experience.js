import React from "react";
import PropTypes from "prop-types";
import DisplaySection from "../profileComponents/DisplaySection";
import ToggleReadOnly from "../profileComponents/ToggleReadOnly";

const Experience = props => {
	const { readOnly, onToggleRead, onChange, experience } = props;
	return (
		<div>
			<ToggleReadOnly readOnly={readOnly} onToggleRead={onToggleRead} />
			<DisplaySection readOnly={readOnly} info={experience} />
		</div>
	);
};

Experience.propTypes = {
	readOnly: PropTypes.bool,
	onToggleRead: PropTypes.func,
	onChange: PropTypes.func,
	experience: PropTypes.arrayOf(PropTypes.shape({}))
};

export default Experience;
