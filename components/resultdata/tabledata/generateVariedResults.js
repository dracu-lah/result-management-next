export function generateVariedResults(studentData) {
  // Grade mapping with marks range
  const gradeSystem = {
    S: { min: 90, max: 100, points: 10 },
    A: { min: 80, max: 89, points: 9 },
    B: { min: 70, max: 79, points: 8 },
    C: { min: 60, max: 69, points: 7 },
    D: { min: 50, max: 59, points: 6 },
    E: { min: 40, max: 49, points: 5 },
    F: { min: 0, max: 39, points: 0 },
  };

  // Course credit hours (typical for diploma in computer engineering)
  const courseCredits = {
    3131: 4, // Computer Architecture
    3001: 3, // Environmental Science & Disaster Management
    3139: 2, // Database Management System Lab
    3138: 2, // Digital Computer Principles Lab
    3137: 2, // Objected Oriented Programming Lab
    3134: 4, // Objected Oriented Programming through C++
    3133: 4, // Digital Computer Principles
    3132: 4, // Database Management System
  };

  return studentData.map((student) => {
    const updatedSemesters = student.semesters.map((semester, index) => {
      let totalCredits = 0;
      let totalGradePoints = 0;

      // Generate varied marks and grades for each course
      const updatedCourses = semester.courses.map((course) => {
        const courseCode = course.course.split("-")[0];
        const credits = courseCredits[courseCode] || 3;

        // Create realistic grade progression
        let marks;
        if (index === 0) {
          // First semester - mostly good grades but not perfect
          marks = Math.floor(Math.random() * 15) + 75; // 75-89
        } else if (index === 1) {
          // Second semester - improvement
          marks = Math.floor(Math.random() * 20) + 75; // 75-94
        } else if (index === 2) {
          // Third semester - slight dip (common pattern)
          marks = Math.floor(Math.random() * 25) + 65; // 65-89
        } else if (index === 3) {
          // Fourth semester - recovery
          marks = Math.floor(Math.random() * 20) + 75; // 75-94
        } else if (index === 4) {
          // Fifth semester - specialization courses, better performance
          marks = Math.floor(Math.random() * 15) + 80; // 80-94
        } else {
          // Final semester - best performance
          marks = Math.floor(Math.random() * 12) + 85; // 85-96
        }

        // Ensure marks are within 0-100 range
        marks = Math.min(100, Math.max(0, marks));

        // Assign grade based on marks
        let grade = "F";
        for (const [g, range] of Object.entries(gradeSystem)) {
          if (marks >= range.min && marks <= range.max) {
            grade = g;
            break;
          }
        }

        totalCredits += credits;
        totalGradePoints += credits * gradeSystem[grade].points;

        return {
          ...course,
          grade: grade,
          marks: marks,
          result: grade === "F" ? "F" : "P",
        };
      });

      // Calculate SGPA
      const sgpa =
        totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : 0;

      return {
        ...semester,
        courses: updatedCourses,
        sgpa: parseFloat(sgpa),
      };
    });

    // Calculate overall CGPA
    const totalSGPAs = updatedSemesters.reduce((sum, sem) => sum + sem.sgpa, 0);
    const cgpa = (totalSGPAs / updatedSemesters.length).toFixed(2);

    return {
      ...student,
      semesters: updatedSemesters,
      cgpa: parseFloat(cgpa),
    };
  });
}

// Usage example:
const variedResults = generateVariedResults([
  {
    registerNumber: 20133048,
    name: "VIVEK T K",
    branch: "Computer Engineering",
    cgpa: 10,
    semesters: [
      {
        sem: 1,
        courses: [
          { course: "3131-Computer Architecture", grade: "A", result: "P" },
          {
            course: "3001-Environmental Science & Disaster Management",
            grade: "B",
            result: "P",
          },
          {
            course: "3139-Database Management System Lab",
            grade: "A",
            result: "P",
          },
          {
            course: "3138-Digital Computer Principles Lab",
            grade: "A",
            result: "P",
          },
          {
            course: "3137-Objected Oriented Programming Lab",
            grade: "A",
            result: "P",
          },
          {
            course: "3134-Objected Oriented Programming through C++",
            grade: "A",
            result: "P",
          },
          {
            course: "3133-Digital Computer Principles",
            grade: "S",
            result: "P",
          },
          {
            course: "3132-Database Management System",
            grade: "S",
            result: "P",
          },
        ],
        sgpa: 10,
      },
      // ... include all semesters similarly
    ],
  },
]);
