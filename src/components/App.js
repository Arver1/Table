import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import WorkerList from './WorkerList';
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import isNumber from '../util';

Date.prototype.format = function(format = 'yyyy-mm-dd') {
  const replaces = {
    yyyy: this.getFullYear(),
    mm: ('0' + (this.getMonth() + 1)).slice(-2),
    dd: ('0' + this.getDate()).slice(-2),
    hh: ('0' + this.getHours()).slice(-2),
    MM: ('0' + this.getMinutes()).slice(-2),
    ss: ('0' + this.getSeconds()).slice(-2),
  };
  let result = format;
  for (const replace in replaces) {
    result = result.replace(replace, replaces[replace]);
  }
  return result;
};

class App extends PureComponent {
  static propTypes = {
    workers: PropTypes.array,
  };
  constructor(props) {
    super(props);
    this.state = {
      workers: this.props.workers,
      activePage: 0,
    };
    this.pageMax = 3;
  }

  changePage = value => {
    if (!isNumber(value)) return;
    this.setState({
      activePage: value,
    });
  };

  sortWorkers = (field, direction, compareF) => {
    const f = compareF
      ? compareF
      : (a, b) => {
          if (a[field] === b[field]) {
            return 0;
          }
          return a[field] > b[field] ? direction : direction * -1;
        };
    this.setState({
      workers: [...this.state.workers].sort(f),
    });
  };

  searchWorkers = value => {
    if (!value) return;
    if (value === 'all') {
      return this.setState({
        workers: this.props.workers,
      });
    }
    const workers = [...this.props.workers].filter(it => {
      let i = 0;
      const keys = Object.keys(it);
      while (i < keys.length) {
        const temp =
          typeof it[keys[i]] === 'number'
            ? it[keys[i]] + ''
            : keys[i] === 'salary'
            ? '$' + it[keys[i]]
            : it[keys[i]].toLowerCase();
        if (temp.indexOf(value) !== -1) return true;
        i++;
      }
      return false;
    });
    this.setState({
      workers,
    });
  };

  render() {
    const index = this.state.activePage * this.pageMax;
    const workers = this.state.workers.slice(index, index + this.pageMax);
    return (
      <main className="row h-100 table-responsive">
        <SearchBar searchWorkers={this.searchWorkers} />
        <WorkerList workers={workers} sortWorkers={this.sortWorkers} />
        <Pagination
          total={this.state.workers.length}
          pageMax={this.pageMax}
          changePage={this.changePage}
          activePage={this.state.activePage}
        />
      </main>
    );
  }
}

export default App;
