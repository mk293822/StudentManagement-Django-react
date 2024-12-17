import React from "react";

const TeacherPerformance = () => {
  const teachers = [
    { name: "Mr. Smith", performance: "Excellent" },
    { name: "Ms. Johnson", performance: "Good" },
    { name: "Mr. Williams", performance: "Satisfactory" },
  ];

  return (
    <div className="teacher-performance">
      <h2>Teacher Performance</h2>
      <ol>
        {teachers.map((teacher, index) => (
          <li key={index}>
            {teacher.name} - {teacher.performance}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default TeacherPerformance;
