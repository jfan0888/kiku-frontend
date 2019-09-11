import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { GeneralView, ObjectButton } from '../../components';

class Complete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      completedData: [],
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
        completedData: newList
      })
    }
  }

  render() {
    const { history } = this.props;
    const { completedData } = this.state;

    return (
      <GeneralView title="complete">
        <div className="page-content">
          <ObjectButton newItem addTitle="add a song" />
          {completedData.map(item => (
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

const mapStateToProps = state => ({
  isFetching: state.lots.isFetching,
  songsData: state.lots.data,
})

export default withRouter(connect(mapStateToProps, null)(Complete));

