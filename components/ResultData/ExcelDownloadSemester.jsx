import React from "react";
import { BsFillFileEarmarkExcelFill } from "react-icons/bs";
import { usePapaParse } from "react-papaparse";

const ExcelDownloadSemester = ({ semData }) => {
  const { jsonToCSV } = usePapaParse();

  const json2CSV = () => {
    const rows = [];
    const { registerNumber, studentName: name, semName: sem, sgpa } = semData;

    for (const course of semData.courses) {
      const { result, internalMark: IMark, course: courseName, grade } = course;
      rows.push({
        registerNumber,
        name,
        sem,
        sgpa,
        courseName,
        IMark,
        grade,
        result,
      });
    }

    // convert jsonToCSV
    const csvData = jsonToCSV(rows);
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
    <button onClick={json2CSV} className="p-2 bg-slate-300 rounded-lg">
      <BsFillFileEarmarkExcelFill className="text-green-500 " />
    </button>
  );
};

export default ExcelDownloadSemester;
