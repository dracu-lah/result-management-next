"use client";
import React, { useEffect, useState } from "react";
import ExcelDownloadButton from "./ExcelDownloadButton";
import TableData from "./TableData";
import Pagination from "./Pagination";

const ResultData = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

  useEffect(() => {
    fetch("output.json")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.log(error));
  }, []);
  const filteredData = data.filter((item) => {
    return (
      item.studentName.toLowerCase().includes(search.toLowerCase()) ||
      item.registerNumber.toString().includes(search)
    );
  });

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  return (
    <div className="flex flex-col justify-between items-center gap-y-2  min-h-[90vh]">
      <div>
        <div className="flex flex-col  items-center m-5 gap-y-4">
          <h2 className="">Student Results</h2>
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            className="bg-slate-200 text-center p-2 text-xs text-neutral rounded-lg px-2 outline-none"
            placeholder="find student by name"
          />
        </div>
        <div className=" flex flex-col gap-3 mx-3">
          {filteredData.slice(firstPostIndex, lastPostIndex).map((item) => (
            <div
              key={item.registerNumber}
              tabIndex={0}
              className=" collapse collapse-arrow border border-slate-300 bg-base-100 rounded-box"
            >
              <input className="" type="checkbox" />

              <div
                className={`flex items-center justify-between collapse-title text-xl font-medium`}
              >
                <p className="text-xs flex gap-1 text-black">
                  <span className="bg-primary  p-2 rounded-lg ">
                    {item.studentName}
                  </span>
                  <span className="bg-primary p-2 rounded-lg">
                    {item.registerNumber}
                  </span>
                  <span className="bg-primary p-2 rounded-lg ">
                    {item.branch}
                  </span>
                  <span className="bg-secondary p-2 rounded-lg">
                    CGPA : <span>{item.cgpa}</span>
                  </span>
                </p>
                <div className=" flex justify-between items-center gap-2">
                  <ExcelDownloadButton data={item} />
                </div>
              </div>
              <div className="collapse-content">
                <TableData
                  semData={item.semesters}
                  regNo={item.registerNumber}
                  studentName={item.studentName}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="m-4">
        <Pagination
          totalPosts={data.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default ResultData;
