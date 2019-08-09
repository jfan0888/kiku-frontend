import React from 'react';
import { Link } from 'react-router-dom';

import { CustomInput, CustomButton } from '../../components';
import './styles.scss';

const kikuLogo = require('../../assets/images/kiku-logo.png');
const ikuImage = require('../../assets/images/iku.png');

class SignIn extends React.Component {
  state = {
    existingUser: false,
  };

  changeStatus = () => {
    this.setState(prevState => {
      return { existingUser: !prevState.existingUser };
    });
  };

  clickHandler = existingUser => {
    if (existingUser) this.props.history.push('./my-profile');
  };

  render() {
    const { existingUser } = this.state;

    return (
      <div className="home-container">
        <div className="page-header">
          <div className="logo-wrapper">
            <img alt="k-logo" src={kikuLogo} />
            <img alt="iku-logo" className="iku-logo" src={ikuImage} />
          </div>
          <div className="page-title">Music that Moves</div>
        </div>
        <div className="page-content">
          <form className="input-form-wrapper">
            {!existingUser && (
              <CustomInput
                className="home-input-item"
                type="text"
                placeholder="First Name"
              />
            )}
            {!existingUser && (
              <CustomInput
                className="home-input-item"
                type="text"
                placeholder="Last Name"
              />
            )}
            <CustomInput
              className="home-input-item"
              type="email"
              placeholder="Email"
            />
            <CustomInput
              className="home-input-item"
              type="password"
              placeholder="Password"
            />
            {!existingUser && (
              <CustomInput
                className="home-input-item"
                type="password"
                placeholder="Confirm Password"
              />
            )}
            <CustomButton
              title={existingUser ? 'sign in' : 'create account'}
              clickHandler={() => this.clickHandler(existingUser)}
            />
          </form>
        </div>
        <footer>
          <div className="footer-text">
            {existingUser
              ? `Don't Have An Account`
              : 'Already Have An Account?'}
            <a className="text-link" onClick={this.changeStatus}>
              {!existingUser ? 'Login' : 'Sign Up'}
            </a>
          </div>
        </footer>
      </div>
    );
  }
}

export default SignIn;
