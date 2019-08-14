import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { getSongById, updateSong } from '../../actions';

import { GeneralView, AddableList, ProgressButton } from '../../components';
import './styles.scss';

class Song extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      btnText: '',
      fileType: '',
      currentSong: null,
      fileFieldValue: '',
    };
    this.fileUploadRef = React.createRef();
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
        this.setState({ btnText: 'share' });
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

  uploadFile = fileType => {
    this.setState({ fileType });
    this.fileUploadRef.click();
  };

  onClickMove = () => {
    const { history } = this.props;
    const { location } = history;
    const { statusText, item } = location.state;

    switch (statusText) {
      case 'idea':
        this.moveInProgress();
        break;
      case 'in progress':
        history.push(`/completed/${item.id}`, {
          item,
          statusText: 'completed',
        });
        break;
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
    });
  };

  addCoWiter = () => {
    //
  };

  render() {
    const { location } = this.props.history;
    const { statusText, item, hasMusic } = location.state;
    const { btnText, currentSong, fileFieldValue } = this.state;

    return (
      <GeneralView
        title={item.title}
        statusText={statusText}
        hasMusic={hasMusic}
      >
        {currentSong ? (
          <>
            <AddableList
              title="archive"
              clickHandler={() => this.uploadFile('archive')}
              data={currentSong.archive}
            />
            <AddableList
              title="lyrics"
              clickHandler={() => this.uploadFile('lyric')}
              data={currentSong.lyrics}
            />
            <div className="lyrics-list">Add Some Lyrics</div>
            <AddableList
              title="add a co-writer"
              clickHandler={this.addCoWiter}
            />
            <div className="progress-button-wrapper">
              {statusText === 'completed' && (
                <ProgressButton
                  backButton
                  title={`move to in progress`}
                  nextStepHandler={this.moveInProgress}
                />
              )}
              <ProgressButton
                title={`move to ${btnText}`}
                nextStepHandler={this.onClickMove}
              />
            </div>
            <input
              ref={input => (this.fileUploadRef = input)}
              type="file"
              style={{ display: 'none' }}
              onChange={this.handleFileUpload}
              value={fileFieldValue}
            />
          </>
        ) : null}
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
