import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const playIcon = require('../../assets/images/play-grey.png');
const plusIcon = require('../../assets/images/plus.png');

class ObjectButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addingTitle: false,
      newTitle: null,
    };
  }

  clickHandler = () => {
    const { newItem } = this.props;
    const { newTitle } = this.state;

    if (newItem) {
      if (newTitle === null) {
        this.setState({ addingTitle: true, newTitle: '' });
      } else {
        this.setState({ newTitle: null })
      }
    } else {
      this.props.clickHandler();
    }
  }

  updateTitle = e => {
    e.preventDefault();
    this.setState({ newTitle: e.target.value })
  }

  updateStatus = e => {
    const { newTitle } = this.state;

    e.preventDefault();
    this.props.clickHandler(newTitle);
    this.setState({ addingTitle: false });
  }

  cancelAdding = () => {
    this.setState({ addingTitle: false, newTitle: '' });
  }

  render() {
    const { title, newItem, addTitle, empty } = this.props;
    const { addingTitle, newTitle } = this.state;

    return (
      <div
        className={`object-button-wrapper${newItem ? ' new' : ''}${empty ? ' empty' : ''}`}
        onClick={this.clickHandler}
      >
        {(addingTitle && newItem) ? <div className="adding-title-container">
          <textarea placeholder="Add a title" value={newTitle} onChange={this.updateTitle} />
          <a className="btn confirm" onClick={this.updateStatus}>
            Ok
            </a>
          <a className="btn" onClick={this.cancelAdding}>
            cancel
            </a>
        </div> : <div className="content">
            <span className="title">{newItem ? addTitle : title}</span>
            <img
              alt="item icon"
              src={newItem ? plusIcon : playIcon}
              className="play-icon"
            />
          </div>}
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
