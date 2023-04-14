"use client";
import React from "react";
import { BsFillFileEarmarkExcelFill } from "react-icons/bs";
import { usePapaParse } from "react-papaparse";

const ExcelDownloadButton = ({ data }) => {
  const { jsonToCSV } = usePapaParse();
  const { registerNumber, name, cgpa } = data;
  // get row data
  const getRowData = () => {
    const rows = [];

    for (const semesters of data.semesters) {
      const { sem, sgpa } = semesters;

      rows.push({
        registerNumber: registerNumber,
        name: name,
        sem: sem,
        sgpa: sgpa,
        cgpa: cgpa,
      });
    }
    return rows;
  };
  // Download csv file
  const csvDownload = () => {
    const rowData = getRowData();

    // convert jsonToCSV
    const csvData = jsonToCSV(rowData);
    // Create a Blob object from the CSV data
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });

    // Create a temporary URL to the Blob object
    const url = URL.createObjectURL(blob);

    // Create a link element to download the CSV file
    const link = document.createElement("a");
    link.href = url;
    link.download = `${registerNumber}_${name}.csv`;
    link.click();
  };
  return (
    <button onClick={csvDownload} className="p-2 bg-slate-300 rounded-lg z-30">
      <BsFillFileEarmarkExcelFill className="text-green-500 " />
    </button>
  );
};

export default ExcelDownloadButton;
