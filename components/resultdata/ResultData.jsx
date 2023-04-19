"use client";
import React, { useEffect, useReducer, useState } from "react";
import ExcelDownloadButton from "./ExcelDownloadButton";
import TableData from "./tabledata/TableData";
import Pagination from "./Pagination";
import axios from "axios";
// initialising states
const initialState = {
  search: "",
  data: [],
  currentPage: 1,
  postsPerPage: 6,
};
// reducer functions
const reducer = (state, action) => {
  // switch through states
  switch (action.type) {
    case "SET_SEARCH":
      return { ...state, search: action.payload };
    case "SET_DATA":
      return { ...state, data: action.payload };
    case "SET_CURRENT_PAGE":
      return { ...state, currentPage: action.payload };
    default:
      return state;
  }
};

const ResultData = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // use effect for output.json

  // useEffect(() => {
  //   fetch("output.json")
  //     .then((response) => response.json())
  //     .then((data) => dispatch({ type: "SET_DATA", payload: data }))
  //     .catch((error) => console.log(error));
  // }, []);
  useEffect(() => {
    axios
      .get(
        "https://result-management-node-production.up.railway.app/api/results"
      )
      .then((response) =>
        dispatch({ type: "SET_DATA", payload: response.data })
      );
  }, []);
  // filtering data for search

  const filteredData = state.data.filter((item) => {
    return (
      item.name.toLowerCase().includes(state.search.toLowerCase()) ||
      item.registerNumber.toString().includes(state.search)
    );
  });

  // sorted data with pagination
  const sortedData = () => {
    const lastPostIndex = state.currentPage * state.postsPerPage;
    const firstPostIndex = lastPostIndex - state.postsPerPage;
    return filteredData.slice(firstPostIndex, lastPostIndex);
  };

  return (
    <div className="flex flex-col justify-between items-center gap-y-2  min-h-[90vh]">
      <div>
        <div className="flex flex-col  items-center m-5 gap-y-4">
          <h2 className="">Student Results</h2>
          <input
            onChange={(e) =>
              dispatch({ type: "SET_SEARCH", payload: e.target.value })
            }
            type="text"
            className="bg-slate-200 text-center p-2 text-xs text-neutral rounded-lg px-2 outline-none"
            placeholder="find student by name"
          />
        </div>
        <div className=" flex flex-col gap-3 mx-3">
          {sortedData().map((item) => (
            <div
              key={item.registerNumber}
              tabIndex={0}
              className=" collapse collapse-arrow border border-slate-300 bg-base-100 rounded-box"
            >
              <input className="" type="checkbox" />

              <div
                className={`flex items-center justify-between collapse-title   font-medium w-full`}
              >
                <p className=" flex gap-1 text-black text-xs flex-wrap gap-x-2">
                  <span className="bg-primary  p-2 rounded-lg ">
                    {item.name}
                  </span>
                  <span className="bg-primary p-2 rounded-lg">
                    {item.registerNumber}
                  </span>
                  {item.cgpa && (
                    <span className="bg-secondary p-2 rounded-lg">
                      CGPA :
                      <span>
                        {item.cgpa} ({(item.cgpa * 9.5).toFixed(2)}%)
                      </span>
                    </span>
                  )}
                </p>
                {item.cgpa && (
                  <div className=" flex justify-between items-center gap-2">
                    <ExcelDownloadButton data={item} />
                  </div>
                )}
              </div>
              <div className="collapse-content">
                <TableData
                  semData={item.semesters}
                  registerNumber={item.registerNumber}
                  name={item.name}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="m-4">
        <Pagination
          totalPosts={state.data.length}
          postsPerPage={state.postsPerPage}
          dispatch={dispatch}
          state={state}
        />
      </div>
    </div>
  );
};

export default ResultData;
