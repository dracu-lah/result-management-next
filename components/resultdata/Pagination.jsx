import React from "react";

const Pagination = ({ totalPosts, postsPerPage, dispatch, state }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePageClick = (pageNumber) => {
    dispatch({ type: "SET_CURRENT_PAGE", payload: pageNumber });
  };

  return (
    <div className="btn-group">
      {pageNumbers.map((number) => (
        <button
          key={number}
          className={`btn btn-xs ${
            number === state.currentPage && "btn-active bg-gray-100"
          }`}
          onClick={() => handlePageClick(number)}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
