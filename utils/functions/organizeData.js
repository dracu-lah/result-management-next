export const organizeData = (jsonData) => {
  const organizedData = [];

  jsonData.forEach((data) => {
    const newData = organizedData.find(
      (item) => item.registerNumber === data["register number"]
    );

    if (newData) {
      newData.courses.push({
        course: data["course"],
        grade: data["grade"],
        result: data["result"],
      });
    } else {
      organizedData.push({
        registerNumber: data["register number"],
        studentName: data["student name"],
        semester: data["semester"],
        courses: [
          {
            course: data["course"],
            grade: data["grade"],
            result: data["result"],
          },
        ],
      });
    }
  });
  return organizedData;
};
