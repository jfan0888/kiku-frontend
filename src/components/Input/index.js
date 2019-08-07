import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const CustomInput = ({ className, type, placeholder, onChange }) => (
  <div className={`custom-input-container ${className}`}>
    <input type={type} placeholder={placeholder} onChange={onChange} />
  </div>
);

CustomInput.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

CustomInput.defaultProps = {
  type: 'text',
  placeholder: 'Type your text',
  onChange: () => {},
};

export default CustomInput;
