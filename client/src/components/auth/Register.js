import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/auth/authActions";
// ====== FORM INPUT ======
import TextFieldInput from "../common/TextFieldInput";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
    // this.state = {
    //   firstName: "test1",
    //   lastName: "tester",
    //   email: "test1@test.com",
    //   password: "password",
    //   password2: "password",
    //   errors: {}
    // };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    // Action
    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <form
                className="form-signin col-md-10 offset-md-1 col-sm-8 offset-sm-2 py-5"
                onSubmit={this.onSubmit}
              >
                {/*FIRST NAME*/}
                <TextFieldInput
                  placeholder="First Name"
                  name="firstName"
                  value={this.state.firstName}
                  onchange={this.onChange}
                  errors={errors.firstName ? errors.firstName : ""}
                />
                {/*LAST NAME*/}
                <TextFieldInput
                  placeholder="Last Name"
                  name="lastName"
                  value={this.state.lastName}
                  onchange={this.onChange}
                  errors={errors.lastName ? errors.lastName : ""}
                />
                {/*EMAIL*/}
                <TextFieldInput
                  placeholder="Email"
                  name="email"
                  value={this.state.email}
                  onchange={this.onChange}
                  errors={errors.email ? errors.email : ""}
                />
                {/*PASSWORD*/}
                <TextFieldInput
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={this.state.password}
                  onchange={this.onChange}
                  errors={errors.password ? errors.password : ""}
                />
                {/*PASSWORD CONFIRMATION*/}
                <TextFieldInput
                  placeholder="Password Confirmation"
                  type="password"
                  name="password2"
                  value={this.state.password2}
                  onchange={this.onChange}
                  errors={errors.password2 ? errors.password2 : ""}
                />
                <button className="btn authSubmit" type="submit">
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object,
  history: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
