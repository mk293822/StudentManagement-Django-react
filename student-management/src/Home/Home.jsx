import React from "react";
import SchoolCalendar from "./SchoolCalender";
import AttendanceTracking from "./AttendanceTracking";
import Overview from "./Overview";
import "./css/Home.css";
import Bottom from "./Bottom";
import { useContext } from "react";
import { Context } from "../Context";
import AddEvent from "./addEvent";

function Home() {
  const { isEventAdd } = useContext(Context);

  if (isEventAdd) {
    return <AddEvent />;
  } else {
    return (
      <main className="main-top-container">
        <div className="sick-leave-container">
          <Overview />
        </div>
        <div className="top-container">
          <Bottom />
          <div className="sub-con">
            <div className="sick-leave-container">
              <h2>Attendance Tracking</h2>
              <AttendanceTracking />
            </div>
            <div className="sick-leave-container">
              <SchoolCalendar />
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default Home;
