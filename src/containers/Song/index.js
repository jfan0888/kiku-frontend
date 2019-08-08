import React from 'react';
import { withRouter } from 'react-router-dom';

import { GeneralView } from '../../components';

class Song extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { location } = this.props.history;
    const { statusText, item, hasMusic } = location.state;

    return (
      <GeneralView
        title={item.title}
        statusText={statusText}
        hasMusic={hasMusic}
      >
        <div className="page-content">Song</div>
      </GeneralView>
    );
  }
}

export default withRouter(Song);
