import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './styles.scss';

const logoIcon = require('../../assets/images/kiku-logo.png');
const playIcon = require('../../assets/images/play-black.png');

const Header = ({ title, hasMusic, statusText }) => (
  <div className="header-container">
    <Link to="/">
      <img alt="logo" src={logoIcon} className="header-logo" />
    </Link>
    <div className="page-title">
      <span className="position-relative">
        {title}
        {statusText !== '' && (
          <span className="status-text position-absolute">{`- ${statusText}`}</span>
        )}
      </span>
      {hasMusic && <img alt="play icon" src={playIcon} className="play-icon" />}
    </div>
  </div>
);

Header.propTypes = {
  title: PropTypes.string,
  hasMusic: PropTypes.bool,
  statusText: PropTypes.string,
};

Header.defaultProps = {
  title: '',
  hasMusic: false,
  statusText: '',
};

export default Header;
