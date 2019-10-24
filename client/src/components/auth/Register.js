import React, { Component } from "react";
import classnames from 'classnames';
import {registerUser}from '../../actions/authActions';
import {connect} from 'react-redux'; //connects component to redux store
import {PropTypes} from 'prop-types'; //makes sure prop types exist before component gets loaded                                

class Register extends Component {
  constructor(){
    super();
    this.state={
      name: '',
      email: '',
      password:'',
      password2:'',
      errors:{}
    }
    this.onChange=this.onChange.bind(this);
    this.onSubmit=this.onSubmit.bind(this);
  }

  onChange(e){
    this.setState({
      [e.target.name]: e.target.value 
    })
  }

  onSubmit(e){
    e.preventDefault();

    const newUser={
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };


    this.props.registerUser(newUser, this.props.history);

  }

  //triggers when props gets new data (nextProps)
  componentWillReceiveProps(nextProps){
    if(nextProps.errors){
      this.setState({errors:nextProps.errors})
    }
  }
  
  render() {
    //read errors from state and write to UI
    const {errors}=this.state; //same as const errors = this.state.errors
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              {/* noValidate prevents Chrome from validating */}
              <form noValidate onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.name //only shows up if name error
                    })}
                    placeholder="Name"
                    value={this.state.name}
                    onChange={this.onChange}
                    name="name"
                    required
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.email //only shows up if email error
                    })}
                    placeholder="Email Address"
                    value={this.state.email}
                    onChange={this.onChange}
                    name="email"
                  />
                  <small className="form-text text-muted">
                    This site uses Gravatar so if you want a profile image, use
                    a Gravatar email
                  </small>
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
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password2 //only shows up if password2 error
                    })}
                    placeholder="Confirm Password"
                    value={this.state.password2}
                    onChange={this.onChange}
                    name="password2"
                  />
                  {errors.password2 && (
                    <div className="invalid-feedback">{errors.password2}</div>
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

//make sure prop types exist before component gets loaded
//PropTypes is library
Register.propTypes={
  registerUser:PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

//take redux state/store data and attach to properties of component
//say what data we want
const mapStateToProps=(state)=>({
  auth: state.auth,
  errors: state.errors
})

//connect is library that connects component to store
//connect has two parameters 1)what to call when data comes in and 2) what to call for sending data out
//Register component connected to registerUser action
//Register component fires registerUser
export default connect( mapStateToProps,{registerUser}) (Register);
