import React from "react";
import PropTypes from "prop-types";
import DisplaySection from "../profileComponents/DisplaySection";
import ToggleReadOnly from "../profileComponents/ToggleReadOnly";

const Education = props => {
	const { readOnly, onToggleRead, onChange, education } = props;
	return (
		<div>
			<ToggleReadOnly readOnly={readOnly} onToggleRead={onToggleRead} />
			<DisplaySection readOnly={readOnly} info={education} />
		</div>
	);
};

Education.propTypes = {
	readOnly: PropTypes.bool,
	onToggleRead: PropTypes.func,
	onChange: PropTypes.func,
	education: PropTypes.arrayOf(PropTypes.shape({}))
};

export default Education;
