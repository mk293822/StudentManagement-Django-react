import React from "react";
import "./css/overviex.css";
import { useContext } from "react";
import { Context } from "../Context";

function Overview() {
  const {
    getApiData,
    getTeacherApiData,
    getAttendanceApiData,
    getEventApiData,
    getOverViewApiData,
  } = useContext(Context);

  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  // Today Section
  const today = `${year}-${month}-${day}`;
  const event = getEventApiData.filter(
    (data) => new Date(data.date).toISOString().split("T")[0] === today
  );

  const presentStudent = getAttendanceApiData.filter(
    (data) => (data.status == "Present") | (data.status == "Late")
  );
  const dailyAttendance = (presentStudent.length / getApiData.length) * 100;

  // overview section
  const upComingEvent = getEventApiData.filter(
    (data) => new Date(data.date).toISOString().split("T")[0] !== today
  );

  return (
    <div className="overview">
      <h2>School Overview</h2>
      {getOverViewApiData.map((data) => {
        return (
          <div className="metrics" key={data.id}>
            <div className="metric">
              <span>School Name:</span> <b>{data.name}</b>
            </div>
            <div className="metric">
              <span>School Type:</span> <b>{data.school_type}</b>
            </div>
            <div className="metric">
              <span>School Open Date:</span> <b>{data.open_at}</b>
            </div>
            <div className="metric">
              <span>Grade Offer:</span> <b>{data.grade_offer}</b>
            </div>
            <div className="metric">
              <span>Total Students:</span> <b>{getApiData.length}</b>
            </div>
            <div className="metric">
              <span>Total Teachers:</span> <b>{getTeacherApiData.length}</b>
            </div>
            <div className="metric">
              <span>S-T Ratio:</span>
              <b>
                {((getApiData.length / getTeacherApiData.length) * 100).toFixed(
                  2
                )}
                %
              </b>
            </div>
            <div className="metric">
              <span>Average Attendance:</span>{" "}
              <b>
                {(
                  (getAttendanceApiData.filter(
                    (data) => data.status == "Present" || data.status == "Late"
                  ).length /
                    getAttendanceApiData.length) *
                  100
                ).toFixed(2)}
                %
              </b>
            </div>
            <div className="metric">
              <span>Upcoming Events: </span> <b>{upComingEvent.length}</b>
            </div>
          </div>
        );
      })}
      <hr />
      <h2>Today's</h2>
      <div className="todays">
        <div className="today">
          Date: {year}-{month}-{day}
        </div>
        <div className="today">Student Attendance: {dailyAttendance}%</div>
        <div className="today">
          Events:{" "}
          {event.length > 0
            ? event.map((data) => {
                return data.name;
              })
            : "None"}
        </div>
      </div>
    </div>
  );
}

export default Overview;
