import React from 'react';
import { withRouter } from 'react-router-dom';

import { GeneralView, ObjectButton } from '../../components';
import { songsData } from '../../mock-data';

class InProgress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { history } = this.props;

    return (
      <GeneralView title="in progress">
        <div className="page-content">
          <ObjectButton newItem addTitle="add a song" />
          {songsData.map(item => (
            <ObjectButton
              key={item.title}
              title={item.title}
              clickHandler={() =>
                history.push(`/in-progress/${item.id}`, {
                  item,
                  statusText: 'in progress',
                  hasMusic: true,
                })
              }
            />
          ))}
        </div>
      </GeneralView>
    );
  }
}

export default withRouter(InProgress);
