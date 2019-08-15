import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';
const forwardIcon = require('../../assets/images/forward.png');
const backwardIcon = require('../../assets/images/backward.png');
const shareIcon = require('../../assets/images/share.png');

const ProgressButton = ({
  title,
  nextStepHandler,
  backButton,
  sharable,
  noIcon,
}) => (
  <button
    className={`btn progress${backButton ? ' back' : ''}`}
    onClick={nextStepHandler}
  >
    {backButton && (
      <img alt="move" src={backwardIcon} className="backward-icon" />
    )}
    <span>{title}</span>
    {!backButton && !noIcon && (
      <img
        alt="move"
        src={sharable ? shareIcon : forwardIcon}
        className="forward-icon"
      />
    )}
  </button>
);

ProgressButton.propTypes = {
  title: PropTypes.string,
  backButton: PropTypes.bool,
  sharable: PropTypes.bool,
  noIcon: PropTypes.bool,
};

ProgressButton.defaultProps = {
  title: 'Button',
  backButton: false,
  sharable: false,
  noIcon: false,
};

export default ProgressButton;
