import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUser } from "../../../../actions/users/userActions";
import Banner from "../profileComponents/Banner";
import Section from "../profileComponents/Section";

class Dashboard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			current: ""
		};

		this.changeFocus = this.changeFocus.bind(this);
	}

	componentDidMount() {
		const { userID } = this.props;
		this.props.getUser(userID);
	}

	changeFocus(arg) {
		this.setState({ current: arg });
		console.log(this.state);
	}

	render() {
		const {
			user: { user },
			page
		} = this.props;
		const blogButtons = [
			{ href: "/posts", text: "See posts" },
			{ href: "/posts", text: "New post" }
		];
		const projectButtons = [
			{ href: "/projects", text: "See projects" },
			{ href: "/projects", text: "New project" }
		];

		return (
			<Fragment>
				<Banner
					user={user}
					changeFocus={this.changeFocus}
				/>
				<Section />
			</Fragment>
		);
	}
}

Dashboard.propTypes = {
	getUser: PropTypes.func.isRequired,
	page: PropTypes.string,
	user: PropTypes.shape({}).isRequired,
	errors: PropTypes.shape({}).isRequired,
	auth: PropTypes.shape({}).isRequired,
	userID: PropTypes.string
};

Dashboard.defaultProps = {
	page: "",
	userID: "",
	errors: {}
};

const mapStateToProps = state => ({
	auth: state.auth,
	user: state.user
});

export default connect(
	mapStateToProps,
	{ getUser }
)(Dashboard);
