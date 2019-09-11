import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  selectLot,
  selectProfile,
  performSPAction,
  getProfiles,
  updateProject,
  createLot,
  loadTalk,
} from '../../redux/reducers/actions';

import { GeneralView, AddableList, ProgressButton } from '../../components';
import ErrorDialog from './ErrorDialog';

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
      iSProfile: 0,
      error: null,
    };
    this.fileUploadRef = React.createRef();
    this.node = React.createRef();
  }

  componentDidMount() {
    this.props.getProfiles();
    this.updateStatus(this.props);
    this.setState({ currentSong: this.props.songData });
  }

  componentWillReceiveProps(nextProps) {
    const { songData, location } = this.props;

    if (location !== nextProps.location) {
      this.updateStatus(nextProps);
    }
    if (songData !== nextProps.songData) {
      this.updateSong(nextProps.songData);
      this.setState({ error: null });
    }
  }

  updateStatus = props => {
    const { location } = props.history;
    const { statusText, item } = location.state;
    const { id, title } = item;
    const { iSProfile } = this.state;

    this.props.onEdit(id, title);

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
        newSong.lists.push(newFile.name);
        break;
      case 'lyric':
        newSong.files.push(newFile.name);
        break;
      default:
        break;
    }

    this.props.updateProject(currentSong.selected_lot, newSong);
    this.setState({ fileType: '' });
  };

  updateLyrics = lyricsText => {
    if (lyricsText.length) {
      const { currentSong } = this.state;
      const newSong = currentSong;

      newSong.lyrics.push(lyricsText);

      this.props.updateProject(1, newSong);
    }
    this.setState({ addingLyrics: false });
  };

  addSongCoWriter = newWriter => {
    const { currentSong } = this.state;
    const newSong = currentSong;

    newSong.coWriters.push(newWriter);
    this.props.updateProject(1, newSong);
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
        history.push(`${process.env.PUBLIC_URL}/completed/${item.id}`, {
          item,
          statusText: 'completed',
          hasMusic: true,
        });
      default:
        break;
    }
  };

  moveInProgress = () => {
    const { history, songData } = this.props;
    const { location } = history;
    const { item } = location.state;

    if (this.isValid('idea')) {
      if (item.title !== songData.title && songData.selected_lot) this.props.updateLot(songData.selected_lot, songData.title)

      history.push(`${process.env.PUBLIC_URL}/in-progress/${item.id}`, {
        item,
        statusText: 'in progress',
        hasMusic: true,
      });
    }
    this.setState({ inReview: false });
  };

  setVisibleSearchableInput = () => {
    this.setState({ visibleSearchInput: true });
  };

  closeSearchableInput = () => {
    this.setState({ visibleSearchInput: false });
  };

  isValid = status => {
    const { songData } = this.props;

    switch (status) {
      case 'idea':
        if (songData.title === '') {
          this.setState({ error: `Title shouldn't be empty!` });
          return false;
        } else { return true }
        break;
      default:
        break;
    }
  }

  render() {
    const { users, songData } = this.props;
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
      error,
    } = this.state;

    return (
      <GeneralView
        title={item.title}
        statusText={statusText}
        hasMusic={hasMusic}
        audioUrl={hasMusic && currentSong && currentSong.audioUrl}
      >
        <div className="page-content flex-column">
          {
            error && <ErrorDialog text={error} closeHandler={() => this.setState({ error: null })} />
          }
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
                    listData={users}
                    closeInput={this.closeSearchableInput}
                    data={currentSong.coWriters}
                    handleAddWriter={this.addSongCoWriter}
                  />
                  <AddableList
                    readOnly={inReview}
                    title="archive"
                    clickHandler={() => this.uploadFile('archive')}
                    data={currentSong.lists}
                  />
                  {statusText !== 'idea' && !sharable && <ChatWidget content={songData.template && songData.template.html} />}
                  <AddableList
                    readOnly={inReview}
                    title="lyrics"
                    clickHandler={() => this.uploadFile('lyric')}
                    data={currentSong.files}
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
  isLoading: state.project.isFetching,
  error: state.project.didInvalidate,
  songData: state.project,
  lots: state.lots.data,
  user: state.user,
  users: state.profiles.data,
});

const mapDispatchToProps = dispatch => ({
  getProfiles: () => {
    return dispatch(getProfiles());
  },
  onEdit: (iLotId, iTitle) => { selectLot(iLotId, iTitle); return dispatch(loadTalk(iLotId)) },
  onRemove: (iId) => dispatch(performSPAction(iId, 'remove')),
  onChangeVisibility: (iId) => dispatch(performSPAction(iId, 'visibility')),
  updateProject: (iLotId, projectData) => dispatch(updateProject(iLotId, projectData)),
  updateLot: (iLotId, title) => dispatch(createLot(iLotId, title))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Song));
