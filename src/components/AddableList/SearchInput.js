import React from 'react';

class SearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
    };
    this.node = React.createRef();
  }

  componentWillMount() {
    document.addEventListener('mousedown', this.handleDocumentClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleDocumentClick, false);
  }

  handleDocumentClick = e => {
    if (this.node.contains(e.target)) return;
    this.props.closeInput();
  };

  handleTextChange = e => {
    e.persist();

    this.setState({ filterText: e.target.value });
  };

  render() {
    const { data } = this.props;
    const { filterText } = this.state;

    console.log('addable list data', data);

    return (
      <div ref={node => (this.node = node)} className="search-input-container">
        <div className="input-wrapper">
          <input
            placeholder="Type name here..."
            value={filterText}
            onChange={this.handleTextChange}
          />
          {filterText.length ? (
            <a
              className="cancel-btn text-link"
              onClick={() => this.setState({ filterText: '' })}
            >
              Cancel
            </a>
          ) : null}
        </div>
        <div className="search-input__content">
          {data &&
            data
              .filter(({ owner }) =>
                owner.name.toLowerCase().includes(filterText.toLowerCase())
              )
              .map(({ id, owner }) => (
                <div
                  className="content-item"
                  key={`filteredItem-${id}`}
                  onClick={() =>
                    this.props.handleAddWriter({ id, name: owner.name, imageUrl: owner.icon })
                  }
                >
                  {owner && <img alt={owner.name} src={owner.icon} />}
                  {owner.name}
                </div>
              ))}
        </div>
      </div>
    );
  }
}

export default SearchInput;
