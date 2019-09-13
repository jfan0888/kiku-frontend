import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ContentEditable from 'react-contenteditable'

import './styles.scss';

const logoIcon = require('../../assets/images/kiku-logo.png');
const playIcon = require('../../assets/images/play-black.png');

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      play: false,
      stop: true,
      html: ""
    };
    this.contentEditable = React.createRef();
    this.audio = null;
  }

  componentDidMount() {
    const { audioUrl, title } = this.props;

    this.audio = new Audio(audioUrl);
    this.setState({ html: title })
  }

  componentWillReceiveProps(nextProps) {
    const { audioUrl } = nextProps;

    if (this.props.audioUrl !== audioUrl) {
      this.audio = new Audio(audioUrl);
    }
  }

  togglePlay = () => {
    this.setState({ play: !this.state.play }, () => {
      this.state.play ? this.audio.play() : this.audio.pause();
    });
  };

  handleChange = evt => {
    const { currentLot } = this.props;

    this.setState({ html: evt.target.value });
    this.props.onUpdate(currentLot, evt.target.value);
  };

  render() {
    const { hasMusic, statusText, title } = this.props;
    const { html } = this.state;

    return (
      <div className="header-container">
        <Link to={`${process.env.PUBLIC_URL}`}>
          <img alt="logo" src={logoIcon} className="header-logo" />
        </Link>
        <div className="page-title">
          <div className={title === '' ? 'main empty-title' : 'main'}>
            <ContentEditable
              innerRef={this.contentEditable}
              className="header-editable-title"
              html={html} // innerHTML of the editable div
              disabled={false}       // use true to disable editing
              onChange={this.handleChange} // handle innerHTML change
              tagName='article' // Use a custom HTML tag (uses a div by default)
            />
            {hasMusic && this.audio && (
              <a className="play-button" onClick={this.togglePlay}>
                <img alt="play icon" src={playIcon} className="play-icon" />
              </a>
            )}
          </div>
          {statusText !== '' && (
            <div className="status-text">{`- ${statusText}`}</div>
          )}
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string,
  hasMusic: PropTypes.bool,
  statusText: PropTypes.string,
};

Header.defaultProps = {
  title: '',
  hasMusic: false,
  statusText: '',
};

const mapStateToProps = state => ({
  isFetching: state.project.isFetching,
  currentLot: state.project.selected_lot,
})

export default connect(mapStateToProps, null)(Header);
