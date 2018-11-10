import React from 'react';
import PropTypes from 'prop-types';

function Worker(props) {
  const {
    worker: { name, position, office, age, start_date, salary },
  } = props;
  return (
    <tr
      key={`id${Math.random()
        .toString(16)
        .slice(2)}`}
    >
      <td>{name}</td>
      <td>{position}</td>
      <td>{office}</td>
      <td>{age}</td>
      <td>{new Date(start_date).format('yyyy/mm/dd')}</td>
      <td>${salary}</td>
    </tr>
  );
}

Worker.propTypes = {
  name: PropTypes.string,
  position: PropTypes.string,
  office: PropTypes.string,
  age: PropTypes.number,
  start_date: PropTypes.instanceOf(Date),
  salary: PropTypes.number,
};

export default Worker;
