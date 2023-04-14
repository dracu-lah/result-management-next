import ExcelDownloadSemester from "./ExcelDownloadSemester";

const TableData = ({ semData, regNo, studentName }) => {
  const updatedSemData = semData.map((item) => ({
    ...item,
    registerNumber: regNo,
    studentName: studentName,
  }));

  console.log(updatedSemData);
  return (
    <div className="overflow-x-auto">
      {updatedSemData.map((item, index) => (
        <div key={index}>
          <div className="flex justify-between m-2 items-center">
            <h1 className="text-center p-4 uppercase font-bold">
              {item.semName}
            </h1>
            <div className="flex gap-x-2">
              <ExcelDownloadSemester semData={item} />
              <p className="p-2 bg-accent rounded-lg text-black">
                SGPA : {item.sgpa}
              </p>
            </div>
          </div>
          <table className="table table-compact w-full">
            <thead>
              <tr>
                <th></th>
                <th>Course</th>
                <th>Grade</th>
                <th>IMark</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {item.courses.map((item, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{item.course}</td>
                  <td>{item.internalMark}</td>
                  <td>{item.grade}</td>
                  <td>{item.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default TableData;
