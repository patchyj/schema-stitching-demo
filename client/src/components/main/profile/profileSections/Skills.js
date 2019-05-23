import React from "react";
import PropTypes from "prop-types";
import SkillSection from "../profileComponents/SkillSection";
import ToggleReadOnly from "../profileComponents/ToggleReadOnly";

const Skills = props => {
	const { readOnly, onToggleRead, skills } = props;
	return (
		<div>
			<ToggleReadOnly readOnly={readOnly} onToggleRead={onToggleRead} />
			{readOnly && <SkillSection info={skills} />}
		</div>
	);
};

Skills.propTypes = {
	readOnly: PropTypes.bool,
	onToggleRead: PropTypes.func,
	skills: PropTypes.arrayOf(PropTypes.shape({}))
};

export default Skills;
