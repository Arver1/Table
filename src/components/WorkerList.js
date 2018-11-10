import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Worker from './Worker';

class WorkerList extends PureComponent {
  static propTypes = {
    workers: PropTypes.array,
  };
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.workers,
    };
    this.direction = {
      name: true,
      position: true,
      office: true,
      age: true,
      start_date: true,
      salary: true,
    };
    this.lastActive = null;
  }

  getBody = workers => {
    return workers.map(worker => (
      <Worker
        worker={worker}
        key={`id${Math.random()
          .toString(16)
          .slice(2)}`}
      />
    ));
  };

  sortByDate = () => {
    const field = 'start_date'
    const direction = this.direction[field] ? 1 : -1;
    const compareF = (a, b) => {
      const first = +new Date(a[field]);
      const second = +new Date(b[field]);
      if (first === second) {
        return 0;
      }
      return first > second ? direction : direction * -1;
    };
    this.sortByField(null, compareF);
    this.direction[field] = !this.direction[field];
    this.lastActive = field;
  };

  sortByField = (field, compareF) => {
    const { sortWorkers } = this.props;
    const direction = this.direction[field] ? 1 : -1;
    this.direction[field] = !this.direction[field];
    this.lastActive = field;
    sortWorkers(field, direction, compareF);
  };

  sortByName = () => {
    this.sortByField('name');
  };

  sortByPosition = () => {
    this.sortByField('position');
  };

  sortByOffice = () => {
    this.sortByField('office');
  };

  sortByAge = () => {
    this.sortByField('age');
  };

  sortBySalary = () => {
    const field = 'salary';
    const direction = this.direction['salary'] ? 1 : -1;
    const compareF = (a, b) => {
      const first = +a[field].replace('$', '');
      const second = +b[field].replace('$', '');
      if (first === second) {
        return 0;
      }
      return first > second ? direction : direction * -1;
    };
    this.sortByField(null, compareF);
    this.direction[field] = !this.direction[field];
    this.lastActive = field;
  };

  defineActive = field =>
    this.lastActive === field
      ? this.direction[this.lastActive]
        ? 'down'
        : null
      : null;

  render() {
    return (
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th onClick={this.sortByName} className={this.defineActive('name')}>
              Name
            </th>
            <th
              onClick={this.sortByPosition}
              className={this.defineActive('position')}
            >
              Position
            </th>
            <th
              onClick={this.sortByOffice}
              className={this.defineActive('office')}
            >
              Office
            </th>
            <th onClick={this.sortByAge} className={this.defineActive('age')}>
              Age
            </th>
            <th
              onClick={this.sortByDate}
              className={this.defineActive('start_date')}
            >
              Start date
            </th>
            <th
              onClick={this.sortBySalary}
              className={this.defineActive('salary')}
            >
              Salary
            </th>
          </tr>
        </thead>
        <tbody>{this.getBody(this.props.workers)}</tbody>
      </table>
    );
  }
}

export default WorkerList;
