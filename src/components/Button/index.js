import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const CustomButton = ({ title, clickHandler }) => (
  <button className="btn register" onClick={clickHandler}>
    {title}
  </button>
);

CustomButton.propTypes = {
  title: PropTypes.string,
};

CustomButton.defaultProps = {
  title: 'Button',
};

export default CustomButton;
