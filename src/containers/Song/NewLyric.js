import React from 'react';
import { ProgressButton } from '../../components';

class NewLyric extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lyricsText: '',
    };
  }

  handleChange = e => {
    this.setState({ lyricsText: e.target.value });
  };

  render() {
    const { lyricsText } = this.state;

    return (
      <div className="new-lyric-container">
        <div className="input-widget empty">
          Add Some Lyrics
          <textarea value={lyricsText} onChange={this.handleChange} />
        </div>
        <div className="progress-button-wrapper">
          <ProgressButton
            noIcon
            title="Done"
            nextStepHandler={() => this.props.updateLyrics(lyricsText)}
          />
        </div>
      </div>
    );
  }
}

export default NewLyric;
