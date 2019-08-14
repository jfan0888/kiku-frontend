import React from 'react';
import ReactTooltip from 'react-tooltip';

import PropTypes from 'prop-types';

const addIcon = require('../../assets/images/add.png');
import './styles.scss';

const AddableList = ({ title, clickHandler, data }) => (
  <div className="addable-list-wrapper">
    <ReactTooltip id="addButton" type="dark" place="top" effect="solid">
      <span>Press the + symbol to add lyrics, audio files, and cowriters!</span>
    </ReactTooltip>

    <div className="addable-list">
      <div className="addable-list__header">
        <span>{title}</span>
        <a
          className="add-btn"
          data-tip
          data-for="addButton"
          onClick={clickHandler}
        >
          <img alt="add icon" src={addIcon} />
        </a>
      </div>
      {data.length ? (
        <ul className="addable-list__content">
          {data.map((item, index) => (
            <li key={`${title}_${index}`}>{item}</li>
          ))}
        </ul>
      ) : null}
    </div>
  </div>
);

AddableList.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array,
};

AddableList.defaultProps = {
  title: 'Add an item',
  data: [],
};

export default AddableList;
