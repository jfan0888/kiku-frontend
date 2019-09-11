import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  createLot, fetchLotsInfo,
} from '../../redux/reducers/actions';
import { GeneralView, ObjectButton } from '../../components';

class Ideas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ideasData: [],
      newIdea: {
        id: new Date().getUTCMilliseconds(),
        title: 'empty'
      }
    };
  }

  componentDidMount() {
    const { isFetching, ideas } = this.props;
    if (!isFetching && ideas) {
      this.updateList(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isFetching, ideas } = nextProps;
    if (!isFetching && ideas !== this.props.ideas) {
      this.updateList(nextProps);
    }
  }

  updateList = ({ ideas }) => {
    const newList = [];

    Object.keys(ideas).forEach(itemKey => {
      const songItem = ideas[itemKey];
      const profiles = songItem.profiles;

      if (Array.isArray(profiles) && !profiles.length) {
        newList.push(songItem);
      }
    });

    this.setState({ ideasData: newList });
  }

  render() {
    const { history } = this.props;
    const { ideasData, newIdea } = this.state;

    if (ideasData.length % 2 === 0) {
      ideasData.push(newIdea);
    }

    return (
      <GeneralView title="Ideas">
        <div className="page-content">
          <ObjectButton newItem addTitle="add an idea" clickHandler={title => this.props.onCreate(0, title)} />
          {ideasData.length ? ideasData.map(item => (
            <ObjectButton
              key={item.id}
              title={item.title}
              empty={item.title === 'empty'}
              clickHandler={() =>
                history.push(`${process.env.PUBLIC_URL}/ideas/${item.id}`, {
                  item,
                  statusText: 'idea',
                })
              }
            />
          )) : null}
        </div>
      </GeneralView>
    );
  }
}

const mapStateToProps = state => ({
  isFetching: state.lots.isFetching,
  ideas: state.lots.data,
})

const mapDispatchToProps = dispatch => ({
  onCreate: (iLot, title) => dispatch(createLot(iLot, title))
    .then(() => { return dispatch(fetchLotsInfo()) })

})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Ideas));
