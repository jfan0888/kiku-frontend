import React from 'react';
import { withRouter } from 'react-router-dom';

import { GeneralView, ObjectButton } from '../../components';
import { songsData } from '../../mock-data';

class Complete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { history } = this.props;

    return (
      <GeneralView title="complete">
        <div className="page-content">
          <ObjectButton newItem addTitle="add a song" />
          {songsData.map(item => (
            <ObjectButton
              key={item.title}
              title={item.title}
              clickHandler={() =>
                history.push(`${process.env.PUBLIC_URL}/completed/${item.id}`, {
                  item,
                  hasMusic: true,
                  statusText: 'completed',
                })
              }
            />
          ))}
        </div>
      </GeneralView>
    );
  }
}

export default withRouter(Complete);
