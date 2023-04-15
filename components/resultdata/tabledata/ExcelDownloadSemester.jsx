import React from "react";
import { BsFillFileEarmarkExcelFill } from "react-icons/bs";
import { usePapaParse } from "react-papaparse";

const ExcelDownloadSemester = ({ semData }) => {
  const { jsonToCSV } = usePapaParse();

  // destructuring sem data
  const { registerNumber, name, sem, sgpa } = semData;
  const getRowData = () => {
    const rows = [];
    
    for (const semCourse of semData.courses) {
      const { result, course, grade } = semCourse;

      // pushing the details to the rows array
      rows.push({
        registerNumber,
        name,
        sem,
        sgpa,
        course,
        grade,
        result,
      });
    }
    return rows;
  };

  // function to download csv file
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
    link.download = `${name}_${sem}.csv`;
    link.click();
  };

  return (
    <button onClick={csvDownload} className="p-2 bg-slate-300 rounded-lg">
      <BsFillFileEarmarkExcelFill className="text-green-500 " />
    </button>
  );
};

export default ExcelDownloadSemester;
