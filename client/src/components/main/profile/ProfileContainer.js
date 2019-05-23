/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom"; // Helps redirecting
import { connect } from "react-redux";
import { setCurrentUserFromToken } from "../../../actions/auth/authActions";
import { getUser } from "../../../actions/users/userActions";
import ProfileNav from "./ProfileNav";
import ProfileContent from "./ProfileContent";

class ProfileContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			profileLinks: ["Dashboard", "Education", "Experience", "Skills"],
			page: "Dashboard",
			readOnly: true
		};

		this.onChangePage = this.onChangePage.bind(this);
		this.onToggleRead = this.onToggleRead.bind(this);
	}

	componentDidMount() {
		const token = window.localStorage.getItem("jwtToken");
		this.props.setCurrentUserFromToken(token);
	}

	onChangePage(page) {
		this.setState({ page });
	}

	onToggleRead() {
		this.setState({ readOnly: !this.state.readOnly });
	}

	render() {
		const { profileLinks, page, readOnly } = this.state;
		const {
			auth: {
				user: { id }
			},
			user
		} = this.props;

		return (
			<div className="profile">
				<ProfileNav
					options={profileLinks}
					page={page}
					onChangePage={this.onChangePage}
				/>
				<ProfileContent
					page={page}
					userID={id}
					user={user}
					readOnly={readOnly}
					onToggleRead={this.onToggleRead}
				/>
			</div>
		);
	}
}

ProfileContainer.propTypes = {
	setCurrentUserFromToken: PropTypes.func.isRequired,
	auth: PropTypes.shape({}).isRequired,
	user: PropTypes.shape({}).isRequired,
	errors: PropTypes.shape({}),
	history: PropTypes.shape({}).isRequired
};

ProfileContainer.defaultProps = {
	errors: {}
};

const mapStateToProps = state => ({
	auth: state.auth,
	user: state.user,
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{ setCurrentUserFromToken, getUser }
)(withRouter(ProfileContainer));
