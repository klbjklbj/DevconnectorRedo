import React, { Component } from "react";
import classnames from "classnames";
import { connect } from "react-redux"; //connects component to redux store
import { loginUser } from "../../actions/authActions"; //sign-in button fires this
import PropTypes from "prop-types";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(newUser);
  }

  //triggers when props gets new data (nextProps)
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated){
      this.props.history.push('/dashboard');
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    //read errors from state and write to UI
    const { errors } = this.state; //same as const errors = this.state.errors

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your DevConnector account
              </p>
              <form noValidate onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.email //only shows up if email error
                    })}
                    value={this.state.email}
                    onChange={this.onChange}
                    placeholder="Email Address"
                    name="email"
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password //only shows up if password error
                    })}
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.onChange}
                    name="password"
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//ensure this data from redux store is ready and available
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

//take redux state/store data and attach to properties of component
//say what data we want
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

//connect is library that connects component to store
//connect has two parameters 1)what to call when data comes in and 2) what to call for sending data out
export default connect(
  mapStateToProps,
  { loginUser }
)(Login);