import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const CustomButton = ({ title }) => (
  <button className="custom-button">{title}</button>
);

CustomButton.propTypes = {
  title: PropTypes.string,
};

CustomButton.defaultProps = {
  title: 'Button',
};

export default CustomButton;
