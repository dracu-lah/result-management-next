"use client";
import React from "react";
import { BsFillFileEarmarkExcelFill } from "react-icons/bs";
import { usePapaParse } from "react-papaparse";

const ExcelDownloadButton = ({ data }) => {
  const { jsonToCSV } = usePapaParse();

  const json2CSV = () => {
    // extract the student data
    const rowsData = [];

    const { registerNumber, studentName: name, cgpa } = data;
    for (const semesters of data.semesters) {
      const { semName, sgpa } = semesters;

      rowsData.push({
        registerNumber: registerNumber,
        name: name,
        semName: semName,
        sgpa: sgpa,
        cgpa: cgpa,
      });
    }

    console.log(rowsData);
    // convert jsonToCSV
    const csvData = jsonToCSV(rowsData);
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
    <button onClick={json2CSV} className="p-2 bg-slate-300 rounded-lg z-30">
      <BsFillFileEarmarkExcelFill className="text-green-500 " />
    </button>
  );
};

export default ExcelDownloadButton;
