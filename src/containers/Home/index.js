import React from 'react';
import { Link } from 'react-router-dom';

import { CustomInput, CustomButton } from '../../components';
import './styles.scss';

const kikuLogo = require('../../assets/images/kiku-logo.png');
const ikuImage = require('../../assets/images/iku.png');

class Home extends React.Component {
  render() {
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
          <div className="input-form-wrapper">
            <CustomInput
              className="home-input-item"
              type="text"
              placeholder="First Name"
            />
            <CustomInput
              className="home-input-item"
              type="text"
              placeholder="Last Name"
            />
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
            <CustomInput
              className="home-input-item"
              type="password"
              placeholder="Confirm Password"
            />
            <CustomButton title="create account" />
          </div>
        </div>
        <footer>
          <div className="footer-text">
            Already Have An Account?
            <Link className="text-link" to="/login">
              Login
            </Link>
          </div>
        </footer>
      </div>
    );
  }
}

export default Home;
