import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUser } from "../../../../actions/users/userActions";
import Card from "../../../common/Card";
import Banner from "../../../common/Banner";

class Dashboard extends Component {
	componentDidMount() {
		const { userID } = this.props;
		this.props.getUser(userID);
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
				<Banner user={user} />
				<div className="container">
					<div className="row">
						<div className="col-md-6">
							<Card
								title="Profile Summary"
								subtitle=""
								text=""
								type="profile"
								data={user && user.profile && Object.entries(user.profile)}
							/>
						</div>
					</div>
					<div className="row mt-4">
						<div className="col-md-6">
							<Card
								title="Posts"
								subtitle=""
								text="Total posts"
								links={blogButtons}
								type="posts"
								data={user && user.blogs}
							/>
						</div>
						<div className="col-md-6">
							<Card
								title="Projects"
								subtitle=""
								text="Total projects"
								links={projectButtons}
								type="projects"
								data={user && user.projects}
							/>
						</div>
					</div>
				</div>
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
	userID: ""
};

const mapStateToProps = state => ({
	auth: state.auth,
	user: state.user
});

export default connect(
	mapStateToProps,
	{ getUser }
)(Dashboard);
