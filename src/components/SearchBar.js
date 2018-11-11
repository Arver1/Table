import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class SearchBar extends PureComponent {
  static propTypes = {
    searchWorkers: PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
    };
  }

  updateSearchValue = e => {
    this.setState({
      searchValue: e.target.value,
    });
  };

  search = e => {
    const { searchWorkers } = this.props;
    e.preventDefault();
    searchWorkers(this.state.searchValue.toLowerCase().trim());
    this.setState({
      searchValue: '',
    });
  };

  render() {
    return (
      <div className="main-search">
        <label className="main-search__label">Search:</label>
        <input
          className="main-search__field"
          value={this.state.searchValue}
          type="text"
          onChange={this.updateSearchValue}
          placeholder="Enter the word all to display all workers"
        />
        <button className="main-search__btn" onClick={this.search}>
          search
        </button>
      </div>
    );
  }
}

export default SearchBar;
