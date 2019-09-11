import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { GeneralView, ObjectButton } from '../../components';

class InProgress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inProgressData: [],
    };
  }

  componentDidMount() {
    const { isFetching, songsData } = this.props;
    if (!isFetching && songsData) {
      const newList = [];

      Object.keys(songsData).forEach(itemKey => {
        newList.push(songsData[itemKey]);
      })

      this.setState({
        inProgressData: newList
      })
    }
  }

  render() {
    const { history } = this.props;
    const { inProgressData } = this.state;

    return (
      <GeneralView title="in progress">
        <div className="page-content">
          <ObjectButton newItem addTitle="add a song" />
          {inProgressData.map(item => (
            <ObjectButton
              key={item.title}
              title={item.title}
              clickHandler={() =>
                history.push(
                  `${process.env.PUBLIC_URL}/in-progress/${item.id}`,
                  {
                    item,
                    statusText: 'in progress',
                    hasMusic: true,
                  }
                )
              }
            />
          ))}
        </div>
      </GeneralView>
    );
  }
}

const mapStateToProps = state => ({
  isFetching: state.lots.isFetching,
  songsData: state.lots.data,
})

export default withRouter(connect(mapStateToProps, null)(InProgress));
