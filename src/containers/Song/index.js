import React from 'react';
import { withRouter } from 'react-router-dom';

import { GeneralView, AddableList, ProgressButton } from '../../components';
import './styles.scss';

class Song extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      btnText: '',
    };
  }

  componentDidMount() {
    this.updateStatus(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.updateStatus(nextProps);
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

  onClickMove = () => {
    const { history } = this.props;
    const { location } = history;
    const { statusText, item } = location.state;

    switch (statusText) {
      case 'idea':
        history.push(`/in-progress/${item.id}`, {
          item,
          statusText: 'in progress',
        });
        break;
      case 'in progress':
        history.push(`/completed/${item.id}`, {
          item,
          statusText: 'completed',
        });
        break;
      case 'complete':
        history.push(`/completed/${item.id}`, {
          item,
          statusText: 'completed',
        });
        break;
      default:
        break;
    }
  };

  render() {
    const { location } = this.props.history;
    const { statusText, item, hasMusic } = location.state;
    const { btnText } = this.state;

    return (
      <GeneralView
        title={item.title}
        statusText={statusText}
        hasMusic={hasMusic}
      >
        <AddableList title="archive" />
        <AddableList title="lyrics" />
        <div className="lyrics-list">Add Some Lyrics</div>
        <AddableList title="add a co-writer" />
        <div className="progress-button-wrapper">
          <ProgressButton
            title={`move to ${btnText}`}
            nextStepHandler={this.onClickMove}
          />
        </div>
      </GeneralView>
    );
  }
}

export default withRouter(Song);
