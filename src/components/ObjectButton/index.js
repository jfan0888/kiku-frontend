import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const playIcon = require('../../assets/images/play-grey.png');
const plusIcon = require('../../assets/images/plus.png');

class ObjectButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { title, newItem, addTitle, clickHandler } = this.props;

    return (
      <div
        className={`object-button-wrapper${newItem ? ' new' : ''}`}
        onClick={clickHandler}
      >
        <div className="content">
          <span className="title">{newItem ? addTitle : title}</span>
          <img
            alt="item icon"
            src={newItem ? plusIcon : playIcon}
            className="play-icon"
          />
        </div>
      </div>
    );
  }
}

ObjectButton.propTypes = {
  title: PropTypes.string,
  addTitle: PropTypes.string,
  newItem: PropTypes.bool,
};

ObjectButton.defaultProps = {
  title: 'Item',
  addTitle: '',
  newItem: false,
};

export default ObjectButton;
