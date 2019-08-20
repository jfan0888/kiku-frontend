import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { getSongById, updateSong } from '../../actions';
import { GeneralView, AddableList, ProgressButton } from '../../components';
import { coWriterData } from '../../mock-data';

import NewLyric from './NewLyric';
import ChatWidget from './ChatWidget';
import './styles.scss';

class Song extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      btnText: '',
      fileType: '',
      currentSong: null,
      fileFieldValue: '',
      visibleSearchInput: false,
      inReview: false,
      addingLyrics: false,
      sharable: false,
    };
    this.fileUploadRef = React.createRef();
    this.node = React.createRef();
  }

  componentDidMount() {
    this.updateStatus(this.props);
    this.setState({ currentSong: this.props.songData });
  }

  componentWillReceiveProps(nextProps) {
    const { songData } = this.props;
    this.updateStatus(nextProps);
    if (songData !== nextProps.songData) {
      this.updateSong(nextProps.songData);
    }
  }

  updateStatus = props => {
    const { location } = props.history;
    const { statusText } = location.state;

    switch (statusText) {
      case 'idea':
        this.setState({ btnText: 'in progress' });
        break;
      case 'in progress':
        this.setState({ btnText: 'complete' });
        break;
      case 'completed':
        this.setState({ btnText: 'share', inReview: true });
        break;
      default:
        break;
    }
  };

  handleFileUpload = e => {
    const { fileType } = this.state;

    if (fileType) {
      this.updateSongFiles(fileType, e.target.files[0]);
    }
  };

  updateSong = newSong => {
    this.setState({ currentSong: newSong, fileType: '' });
  };

  updateSongFiles = (fileType, newFile) => {
    const { currentSong } = this.state;
    const newSong = currentSong;

    switch (fileType) {
      case 'archive':
        newSong.archive.push(newFile.name);
        break;
      case 'lyric':
        newSong.lyrics.push(newFile.name);
        break;
      default:
        break;
    }

    this.props.updateSong(1, newSong);
    this.setState({ fileType: '' });
  };

  updateLyrics = lyricsText => {
    if (lyricsText.length) {
      const { currentSong } = this.state;
      const newSong = currentSong;

      newSong.lyrics.push(lyricsText);

      this.props.updateSong(1, newSong);
    }
    this.setState({ addingLyrics: false });
  };

  addSongCoWriter = newWriter => {
    const { currentSong } = this.state;
    const newSong = currentSong;

    newSong.coWriters.push(newWriter);
    this.props.updateSong(1, newSong);
    this.setState({ visibleSearchInput: false });
  };

  uploadFile = fileType => {
    this.setState({ fileType });
    this.fileUploadRef.click();
  };

  onClickMove = () => {
    const { history } = this.props;
    const { inReview } = this.state;
    const { location } = history;
    const { statusText, item } = location.state;

    if (inReview) {
      this.setState({ sharable: true });
      return;
    }

    switch (statusText) {
      case 'idea':
        this.moveInProgress();
        break;
      case 'in progress':
        history.push(`/completed/${item.id}`, {
          item,
          statusText: 'completed',
          hasMusic: true,
        });
      default:
        break;
    }
  };

  moveInProgress = () => {
    const { history } = this.props;
    const { location } = history;
    const { item } = location.state;

    history.push(`/in-progress/${item.id}`, {
      item,
      statusText: 'in progress',
      hasMusic: true,
    });
    this.setState({ inReview: false });
  };

  setVisibleSearchableInput = () => {
    this.setState({ visibleSearchInput: true });
  };

  closeSearchableInput = () => {
    this.setState({ visibleSearchInput: false });
  };

  render() {
    const { location } = this.props.history;
    const { statusText, item, hasMusic } = location.state;
    const {
      btnText,
      inReview,
      currentSong,
      addingLyrics,
      fileFieldValue,
      visibleSearchInput,
      sharable,
      fileType,
    } = this.state;

    return (
      <GeneralView
        title={item.title}
        statusText={statusText}
        hasMusic={hasMusic}
        audioUrl={hasMusic && currentSong && currentSong.audioUrl}
      >
        <div className="page-content flex-column">
          {currentSong ? (
            addingLyrics ? (
              <NewLyric updateLyrics={this.updateLyrics} />
            ) : (
              <>
                <AddableList
                  readOnly={inReview}
                  coWriter
                  title={
                    statusText === 'completed'
                      ? 'co-writers'
                      : 'add a co-writer'
                  }
                  visibleList={visibleSearchInput}
                  clickHandler={this.setVisibleSearchableInput}
                  listData={coWriterData}
                  closeInput={this.closeSearchableInput}
                  data={currentSong.coWriters}
                  handleAddWriter={this.addSongCoWriter}
                />
                <AddableList
                  readOnly={inReview}
                  title="archive"
                  clickHandler={() => this.uploadFile('archive')}
                  data={currentSong.archive}
                />
                {statusText !== 'idea' && !sharable && <ChatWidget />}
                <AddableList
                  readOnly={inReview}
                  title="lyrics"
                  clickHandler={() => this.uploadFile('lyric')}
                  data={currentSong.lyrics}
                />
                {!inReview && (
                  <div
                    className="input-widget"
                    onClick={() => this.setState({ addingLyrics: true })}
                  >
                    Add Some Lyrics
                  </div>
                )}
                {!sharable && (
                  <div className="progress-button-wrapper">
                    {statusText === 'completed' && (
                      <ProgressButton
                        backButton
                        title={`move to in progress`}
                        nextStepHandler={this.moveInProgress}
                      />
                    )}
                    <ProgressButton
                      sharable={statusText === 'completed'}
                      title={
                        statusText === 'completed'
                          ? 'request to share'
                          : `move to ${btnText}`
                      }
                      nextStepHandler={this.onClickMove}
                    />
                  </div>
                )}

                <input
                  ref={input => (this.fileUploadRef = input)}
                  type="file"
                  accept={fileType === 'archive' ? '.doc' : 'audio/*'}
                  style={{ display: 'none' }}
                  onChange={this.handleFileUpload}
                  value={fileFieldValue}
                />
              </>
            )
          ) : null}
        </div>
      </GeneralView>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.song.isLoading,
  error: state.song.error,
  songData: state.song.data,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getSongById,
      updateSong,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Song));
