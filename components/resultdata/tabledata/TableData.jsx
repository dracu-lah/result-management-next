import ExcelDownloadSemester from "./ExcelDownloadSemester";

const TableData = ({ semData, registerNumber, name }) => {
  // updated sem data for getting register number
  const updatedSemData = semData.map((item) => ({
    ...item,
    registerNumber: registerNumber,
    name: name,
  }));

  return (
    <div className="overflow-x-auto">
      {updatedSemData.map((item, index) => (
        <div key={index}>
          <div className="flex justify-between m-2 items-center">
            <h1 className="text-center p-4 uppercase font-bold">
              Semester {item.sem}
            </h1>
            <div className="flex gap-x-2">
              <ExcelDownloadSemester semData={item} />
              <p className="p-2 bg-accent rounded-lg text-xs md:text-sm text-black">
                SGPA : {item.sgpa} ({(item.sgpa - 0.75) * 10}%)
              </p>
            </div>
          </div>
          <table className="table table-compact w-full">
            <thead>
              <tr>
                <th></th>
                <th>Course</th>
                <th>Grade</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {item.courses.map((item, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{item.course}</td>
                  <td className="text-center">{item.grade}</td>
                  <td className="text-center">{item.result}</td>
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