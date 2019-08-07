import React from 'react';

import { CustomInput } from '../../components';
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
          <CustomInput
            className="contact-input-item"
            type="text"
            placeholder="First Name"
          />
          <CustomInput
            className="contact-input-item"
            type="text"
            placeholder="Last Name"
          />
        </div>
      </div>
    );
  }
}

export default Home;
