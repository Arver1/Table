import React from 'react';

function Pagination({ total, pageMax, changePage, activePage }) {
  const amount = Math.ceil(total / pageMax);
  function getBody() {
    return [...new Array(amount)].map((it, index) => {
      const name = index === activePage ? 'Pagination__item--active' : '';
      return (
        <button
          key={index}
          value={index}
          className={'Pagination__item ' + name}
        >
          {index}
        </button>
      );
    });
  }

  function togglePage(e) {
    if (e.target.tagName.toLowerCase() !== 'button') return;
    let value = e.target.value;
    if (value === 'next') value = activePage + 1;
    if (value === 'prev') value = activePage - 1;
    if (value < 0 || value > amount) return;
    changePage(+value);
  }

  return (
    <div onClick={togglePage} className="Pagination">
      <button
        className="Pagination__item"
        value="prev"
        disabled={activePage === 0}
      >
        Previous
      </button>
      {getBody()}
      <button
        className="Pagination__item"
        value="next"
        disabled={activePage === amount - 1}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
