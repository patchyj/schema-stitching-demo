import React, { Fragment } from "react";
import PropTypes from "prop-types";

import Dashboard from "./profileSections/Dashboard";
import Experience from "./profileSections/Experience";
import Education from "./profileSections/Education";
import Skills from "./profileSections/Skills";

const ProfileContent = props => {
	console.log(props);
	const { page, user, readOnly, onToggleRead, onChange } = props;

	const profile = user && user.user && user.user.profile;

	return (
		<Fragment>
			{page === "Dashboard" && <Dashboard {...props} />}
			{page === "Experience" && (
				<Experience
					readOnly={readOnly}
					onToggleRead={onToggleRead}
					experience={profile.experience}
				/>
			)}
			{page === "Education" && (
				<Education
					readOnly={readOnly}
					onToggleRead={onToggleRead}
					education={profile.education && profile.education}
				/>
			)}
			{page === "Skills" && (
				<Skills
					readOnly={readOnly}
					onToggleRead={onToggleRead}
					skills={profile.skills}
				/>
			)}
		</Fragment>
	);
};

ProfileContent.propTypes = {
	page: PropTypes.string.isRequired,
	onChange: PropTypes.func,
	onToggleRead: PropTypes.func
};

export default ProfileContent;
