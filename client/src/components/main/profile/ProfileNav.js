/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";
import PropTypes from "prop-types";

const ProfileNav = ({ options, page, onChangePage }) => {
	const renderLinks = options.map(profileLink => (
		<li className="nav-item" key={profileLink}>
			<span
				className={`nav-link ${page === profileLink ? "active" : ""}`}
				onClick={() => onChangePage(profileLink)}
			>
				{profileLink}
			</span>
		</li>
	));

	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark secondary-nav sticky-top">
			<button
				className="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarsExample08"
				aria-controls="navbarsExample08"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span className="navbar-toggler-icon" />
			</button>

			<div
				className="collapse navbar-collapse justify-content-md-center"
				id="navbarsExample08"
			>
				<ul className="navbar-nav">{renderLinks}</ul>
			</div>
		</nav>
	);
};

ProfileNav.propTypes = {
	onChangePage: PropTypes.func
};

export default ProfileNav;
