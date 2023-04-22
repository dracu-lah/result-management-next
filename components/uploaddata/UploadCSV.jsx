"use client";
import React, { useState } from "react";
import { read, utils } from "xlsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { organizeData } from "../../utils/functions/organizeData";

const UploadCSV = () => {
  const [result, setResult] = useState(null);
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

          let isFound = str.includes(
            "register number" ||
              "Register Number" ||
              "registerNumber" ||
              "RegisterNumber"
          );
          if (isFound) {
            const organizedData = organizeData(xlsx_json);
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

  console.log(typeof result);
  return (
    <div>
      <form
        className="flex flex-col gap-10 items-center justify-center"
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            // await axios.post("http://localhost:8000/", { result });
            await axios.post(
              "https://result-management-node-production.up.railway.app/",
              { result }
            );
            console.log("results sent to server");
          } catch (error) {
            console.error(error);
            toast("Data not send to server");
          }
        }}
      >
        <div className="flex gap-10">
          <input
            className="file-input file-input-bordered w-full max-w-xs"
            type="file"
            onChange={readUploadFile}
          />
          <button type="reset" onClick={() => setResult(null)}>
            reset
          </button>
        </div>
        <div>
          {result && (
            <p className=" bg-slate-900 text-slate-100 dark:bg-slate-800   max-h-80 rounded-md p-2 overflow-scroll scrollbar-hide">
              <pre className=" ">{JSON.stringify(result, null, 2)}</pre>
            </p>
          )}
          <p className="text-sm p-1">
            <span>{result ? "scroll" : "upload"} </span>
            to view the data
          </p>
        </div>
        <button className="btn " type="submit">
          POST
        </button>
        <ToastContainer />
      </form>
    </div>
  );
};

export default UploadCSV;
