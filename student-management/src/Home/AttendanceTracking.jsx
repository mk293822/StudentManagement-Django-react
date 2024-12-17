import React, { useMemo } from "react";
import "./css/attendance.css";
import { useContext } from "react";
import { Context } from "../Context";

const AttendanceTracking = () => {
  const { getAttendanceApiData, getApiData } = useContext(Context);

  const date = new Date();
  const today = date.toISOString().split("T")[0];
  const absent = useMemo(
    () =>
      getAttendanceApiData.filter(
        (data) => data.status === "Absent" && data.date == today
      ),
    [getAttendanceApiData, today]
  );

  const late = useMemo(
    () =>
      getAttendanceApiData.filter(
        (data) => data.status === "Late" && data.date == today
      ),
    [getAttendanceApiData, today]
  );

  // Function to render student information based on status (absent/late)
  const renderStudentList = (attendanceRecords) => {
    return attendanceRecords.map((record) => {
      const student = getApiData.find((data) => data.id === record.student);
      if (student) {
        return (
          <li key={student.id}>
            {student.name} - {student.grade}
          </li>
        );
      } else {
        return <li key={record.student}>Student data not found</li>;
      }
    });
  };

  return (
    <div className="attendance-tracking">
      <div className="absent-container">
        <h3>Absent</h3>
        <ol>{renderStudentList(absent)}</ol>
      </div>
      <div className="hr"></div>
      <div className="late-container">
        <h3>Late</h3>
        <ol>{renderStudentList(late)}</ol>
      </div>
    </div>
  );
};

export default AttendanceTracking;
