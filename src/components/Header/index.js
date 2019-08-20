import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './styles.scss';

const logoIcon = require('../../assets/images/kiku-logo.png');
const playIcon = require('../../assets/images/play-black.png');

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      play: false,
      stop: true,
    };
    this.audio = null;
  }

  componentDidMount() {
    const { audioUrl } = this.props;

    this.audio = new Audio(audioUrl);
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

  render() {
    const { title, hasMusic, statusText } = this.props;

    return (
      <div className="header-container">
        <Link to="/">
          <img alt="logo" src={logoIcon} className="header-logo" />
        </Link>
        <div className="page-title">
          <span className="position-relative">
            {title}
            {statusText !== '' && (
              <span className="status-text position-absolute">{`- ${statusText}`}</span>
            )}
          </span>
          {hasMusic && this.audio && (
            <a className="play-button" onClick={this.togglePlay}>
              <img alt="play icon" src={playIcon} className="play-icon" />
            </a>
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

export default Header;
