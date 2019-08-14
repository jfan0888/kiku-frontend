import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';
const forwardIcon = require('../../assets/images/forward.png');
const backwardIcon = require('../../assets/images/backward.png');

const ProgressButton = ({ title, nextStepHandler, backButton }) => (
  <button
    className={`btn progress${backButton ? ' back' : ''}`}
    onClick={nextStepHandler}
  >
    {backButton && (
      <img alt="move" src={backwardIcon} className="backward-icon" />
    )}
    <span>{title}</span>
    {!backButton && (
      <img alt="move" src={forwardIcon} className="forward-icon" />
    )}
  </button>
);

ProgressButton.propTypes = {
  title: PropTypes.string,
  backButton: PropTypes.bool,
};

ProgressButton.defaultProps = {
  title: 'Button',
  backButton: false,
};

export default ProgressButton;
