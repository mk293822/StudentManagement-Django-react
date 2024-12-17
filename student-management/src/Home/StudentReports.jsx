import React from "react";

const StudentReports = () => {
  // For demonstration, you can simulate fetching this data
  const studentPerformance = [
    { name: "John Doe", grade: "A", attendance: "98%" },
    { name: "Jane Smith", grade: "B+", attendance: "92%" },
    { name: "Sam Wilson", grade: "A-", attendance: "97%" },
  ];

  return (
    <div className="student-reports">
      <h2>Student Reports</h2>
      <table>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Grade</th>
            <th>Attendance</th>
          </tr>
        </thead>
        <tbody>
          {studentPerformance.map((student, index) => (
            <tr key={index}>
              <td>{student.name}</td>
              <td>{student.grade}</td>
              <td>{student.attendance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentReports;
