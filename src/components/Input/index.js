import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const emailIcon = require('../../assets/images/email.png');
const emailCircleIcon = require('../../assets/images/email-circle.png');
const keyIcon = require('../../assets/images/key.png');
const keyCircleIcon = require('../../assets/images/key-circle.png');
const editIcon = require('../../assets/images/edit.png');

const PlaceholderImage = ({ type, editable }) => {
  switch (type) {
    case 'email':
      return (
        <img
          className={`placeholder-image${editable ? ' editable' : ''}`}
          src={editable ? emailCircleIcon : emailIcon}
          style={editable ? null : { paddingLeft: 7 }}
        />
      );
    case 'password':
      return (
        <img
          className={`placeholder-image${editable ? ' editable' : ''}`}
          src={editable ? keyCircleIcon : keyIcon}
          style={editable ? null : { paddingLeft: 7 }}
        />
      );
    default:
      return null;
  }
};

class CustomInput extends React.Component {
  state = {
    addable: false,
  };

  handleChangeEditableStatus = () => {
    this.setState(prevState => {
      return { addable: !prevState.addable };
    });
  };

  render() {
    const {
      className,
      type,
      editable,
      placeholder,
      value,
      onChange,
    } = this.props;
    const { addable } = this.state;

    return (
      <div className={`custom-input-container ${className}`}>
        <PlaceholderImage type={type} editable={editable} />
        <input
          type={type}
          autoFocus={addable}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={
            editable
              ? type === 'email' || type === 'password'
                ? { paddingLeft: 0 }
                : null
              : null
          }
        />
        {editable && (
          <a className="edit-btn" onClick={this.handleChangeEditableStatus}>
            <img alt="edit" src={editIcon} />
          </a>
        )}
      </div>
    );
  }
}

CustomInput.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  editable: PropTypes.bool,
  onChange: PropTypes.func,
};

CustomInput.defaultProps = {
  type: 'text',
  placeholder: 'Type your text',
  editable: false,
  onChange: () => {},
};

export default CustomInput;
