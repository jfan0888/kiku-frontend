import React from 'react';
import ReactTooltip from 'react-tooltip';

import PropTypes from 'prop-types';

const addIcon = require('../../assets/images/add.png');
import './styles.scss';

const AddableList = ({ title, children }) => (
  <div className="addable-list-wrapper">
    <ReactTooltip id="addButton" type="dark" effect="solid">
      <span>Press the + symbol to add lyrics, audio files, and cowriters!</span>
    </ReactTooltip>

    <div className="addable-list">
      <div className="addable-list__header">
        <span>{title}</span>
        <a className="add-btn" data-tip data-for="addButton">
          <img alt="add icon" src={addIcon} />
        </a>
      </div>
      <div className="addable-list__content">{children}</div>
    </div>
  </div>
);

AddableList.propTypes = {
  title: PropTypes.string,
};

AddableList.defaultProps = {
  title: 'Add an item',
};

export default AddableList;
