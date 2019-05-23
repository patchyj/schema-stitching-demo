import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom"; // Helps redirecting
import { connect } from "react-redux";
import { loginUser } from "../../actions/auth/authActions";
// ====== FORM INPUT ======
import TextFieldInput from "../common/TextFieldInput";

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "test1@test.com",
			password: "password",
			errors: {}
		};
		// this.state = {
		//   email: '',
		//   password: '',
		//   errors: {}
		// };

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ errors: nextProps.auth.errors });
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onSubmit(e) {
		e.preventDefault();

		const userData = {
			email: this.state.email,
			password: this.state.password
		};

		this.props.loginUser(userData, this.props.history);
	}

	render() {
		const { errors } = this.state;

		return (
			<div className="login">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<form
								className="form-signin col-md-8 offset-md-2 col-sm-6 offset-sm-3 py-5 my-5"
								onSubmit={this.onSubmit}
							>
								<TextFieldInput
									placeholder="Email"
									name="email"
									value={this.state.email}
									onchange={this.onChange}
									errors={errors && errors.email ? errors.email : ""}
								/>
								<TextFieldInput
									placeholder="Password"
									type="password"
									name="password"
									value={this.state.password}
									onchange={this.onChange}
									errors={errors && errors.password ? errors.password : ""}
								/>
								<button className="btn authSubmit" type="submit">
									Sign in
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Login.propTypes = {
	loginUser: PropTypes.func.isRequired,
	auth: PropTypes.shape({}).isRequired,
	errors: PropTypes.shape({}).isRequired,
	history: PropTypes.shape({}).isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{ loginUser }
)(withRouter(Login));

// Hit the login route which gives us a token which is then stored in local storage. Then we send that token along with any request to access any private route
