import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';
const forwardIcon = require('../../assets/images/forward.png');

const ProgressButton = ({ title, nextStepHandler }) => (
  <button className="btn progress" onClick={nextStepHandler}>
    <span>{title}</span>
    <img alt="move" src={forwardIcon} className="forward-icon" />
  </button>
);

ProgressButton.propTypes = {
  title: PropTypes.string,
};

ProgressButton.defaultProps = {
  title: 'Button',
};

export default ProgressButton;
