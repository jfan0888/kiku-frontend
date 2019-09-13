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
      this.updateList(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isFetching, songsData } = nextProps;
    if (!isFetching && songsData !== this.props.songsData) {
      this.updateList(nextProps);
    }
  }

  updateList = ({ songsData }) => {
    const newList = [];

    Object.keys(songsData).forEach(itemKey => {
      const songItem = songsData[itemKey];
      const itemClass = songItem.class;

      if (itemClass === 'members') {
        newList.push(songItem);
      }
    });

    this.setState({ inProgressData: newList });
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
