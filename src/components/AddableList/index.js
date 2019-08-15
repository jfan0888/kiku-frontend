import React from 'react';
import ReactTooltip from 'react-tooltip';
import PropTypes from 'prop-types';

import SearchInput from './SearchInput';

const addIcon = require('../../assets/images/add.png');
import './styles.scss';

const AddableList = ({
  title,
  readOnly,
  clickHandler,
  data,
  coWriter,
  visibleList,
  listData,
  closeInput,
  handleAddWriter,
}) => (
  <div className="addable-list-wrapper">
    <ReactTooltip id="addButton" type="dark" place="top" effect="solid">
      <span>Press the + symbol to add lyrics, audio files, and cowriters!</span>
    </ReactTooltip>

    <div className="addable-list">
      <div className="addable-list__header">
        <span>{title}</span>
        {!readOnly && (
          <a
            className="add-btn"
            data-tip
            data-for="addButton"
            onClick={clickHandler}
          >
            <img alt="add icon" src={addIcon} />
          </a>
        )}
      </div>
      {data.length ? (
        <ul className="addable-list__content">
          {data.map((item, index) =>
            coWriter ? (
              <li
                className="content-item"
                key={`filteredItem-${index}`}
                style={{ border: 'none' }}
              >
                {item.imageUrl && <img alt={item.name} src={item.imageUrl} />}
                {item.name}
              </li>
            ) : (
              <li key={`${title}_${index}`}>{item}</li>
            )
          )}
        </ul>
      ) : null}
    </div>

    {coWriter && visibleList && (
      <SearchInput
        data={listData}
        closeInput={closeInput}
        handleAddWriter={handleAddWriter}
      />
    )}
  </div>
);

AddableList.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array,
  listData: PropTypes.array,
  coWriter: PropTypes.bool,
  visibleList: PropTypes.bool,
  readOnly: PropTypes.bool,
  closeInput: PropTypes.func,
  handleAddWriter: PropTypes.func,
};

AddableList.defaultProps = {
  title: 'Add an item',
  data: [],
  listData: [],
  readOnly: false,
  coWriter: false,
  visibleList: false,
  closeInput: () => {},
  handleAddWriter: () => {},
};

export default AddableList;
