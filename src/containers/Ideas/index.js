import React from 'react';
import { withRouter } from 'react-router-dom';

import { GeneralView, ObjectButton } from '../../components';
import { ideasData } from '../../mock-data';

class Ideas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { history } = this.props;

    return (
      <GeneralView title="Ideas">
        <div className="page-content">
          <ObjectButton newItem addTitle="add an idea" />
          {ideasData.map(item => (
            <ObjectButton
              key={item.title}
              title={item.title}
              clickHandler={() =>
                history.push(`/ideas/${item.id}`, { item, statusText: 'idea' })
              }
            />
          ))}
        </div>
      </GeneralView>
    );
  }
}

export default withRouter(Ideas);
