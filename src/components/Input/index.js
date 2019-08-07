import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const emailIcon = require('../../assets/images/email.png');
const keyIcon = require('../../assets/images/key.png');

const PlaceholderImage = ({ type }) => {
  switch (type) {
    case 'email':
      return <img className="placeholder-image" src={emailIcon} />;
    case 'password':
      return <img className="placeholder-image" src={keyIcon} />;
    default:
      return null;
  }
};

class CustomInput extends React.Component {
  render() {
    const { className, type, placeholder, onChange } = this.props;

    return (
      <div className={`custom-input-container ${className}`}>
        <PlaceholderImage type={type} />
        <input type={type} placeholder={placeholder} onChange={onChange} />
      </div>
    );
  }
}

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
