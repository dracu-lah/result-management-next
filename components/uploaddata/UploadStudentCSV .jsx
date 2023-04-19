"use client";
import React, { useState } from "react";
import { read, utils } from "xlsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { organizeData } from "@/utils/functions/organizeDataForStudent";

const UploadStudentCSV = () => {
  const [result, setResult] = useState({});
  const readUploadFile = (e) => {
    e.preventDefault();
    try {
      if (e.target.files) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = e.target.result;
          const workbook = read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const xlsx_json = utils.sheet_to_json(worksheet);
          const str = JSON.stringify(xlsx_json);

          let isFound = str.includes("register number");

          if (isFound) {
            const organizedData = organizeDataforStudent(xlsx_json);
            setResult(organizedData);
            toast("Correct file is uploaded");
          } else {
            toast("Wrong file or Wrong file format");
            return;
          }
        };
        reader.readAsArrayBuffer(e.target.files[0]);
      }
    } catch (error) {
      console.log("error in file reading");
    }
  };

  return (
    <form
      className="flex flex-col md:flex-row gap-10 items-center justify-center"
      onSubmit={async (e) => {
        e.preventDefault();

        try {
          // await axios.post("http://localhost:8000/api/results", { result });
          await axios.post(
            "https://result-management-node-production.up.railway.app/",
            result
          );
          console.log("results sent to server");
        } catch (error) {
          console.error(error);
          toast("Data not send to server");
        }
      }}
    >
      <input
        className="file-input file-input-bordered w-full max-w-xs"
        type="file"
        onChange={readUploadFile}
      />
      <button className="btn " type="submit">
        POST
      </button>
      <ToastContainer />
    </form>
  );
};

export default UploadStudentCSV;
