const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
const port = 8000;
// mysql connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "student_db",
});
// db connection
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database: ", err);
    return;
  }

  console.log("Connected to database");
});

app.use(bodyParser.json());
app.use(cors());

// get data from post

app.post("/api/results", (req, res) => {
  const students = req.body.result;

  connection.query(
    "SELECT course_code, credit FROM c_data",
    (error, results) => {
      if (error) {
        console.error("Error retrieving data from MySQL server:", error);
        res.status(500).send("Internal server error");
        return;
      }
      const credits = results;
      //   get data of a student from students data
      for (const student of students) {
        let totalCreditPoints = 0;
        let totalGradePoints = 0;
        const { registerNumber, studentName, semester, courses } = student;
        //  get a course from courses
        for (const course of courses) {
          const [courseCode] = course.course.split("-");
          const creditPoint = credits.find(
            (credit) => credit.course_code === parseInt(courseCode)
          ).credit;
          const gradePoints = { S: 10, A: 9, B: 8, C: 7, D: 6, E: 5, F: 0 };
          const gradePoint = gradePoints[course.grade];
          totalCreditPoints += creditPoint;
          totalGradePoints += creditPoint * gradePoint;
        }

        const sgpa = parseFloat(
          (totalGradePoints / totalCreditPoints).toFixed(2)
        );
        // store semester data to a JSON
        const semesterData = JSON.stringify({
          semester: semester,
          sgpa: sgpa,
          courses: courses,
        });
        const qr = `insert into student_data(register_number, student_name, semester_data) values(${registerNumber}, '${studentName}', '${semesterData}')`;
        connection.query(qr, (err, results) => {
          if (err) {
            console.log({ error: "Operation failed" });
          } else {
            console.log({ success: "Operation completed" });
          }
        });
      }
    }
  );

  res.send("result recieved");
});

app.get("/api/results", (req, res) => {
  res.send("server");
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
