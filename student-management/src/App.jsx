import { useState } from "react";
import Main from "./Student/Body";
import Nav from "./Navigation/Nav";
import "./css/App.css";
import { Context } from "./Context";
import StudentInfoBackend from "./Student/manageStudentData";
import ClassTable from "./TimeTable/Class-Table";
import ClassListBackend from "./TimeTable/manageClassList";
import TeachersHandler from "./Teachers/Teacher";
import TeacherInfoBackend from "./Teachers/manageTeacher";
import TimeTableBackend from "./TimeTable/manageTimetable";
import Home from "./Home/Home";
import AttendanceBackend from "./TimeTable/attendanceManage";
import EventBackend from "./Home/EventManage";
import PrincipalBackend from "./Home/Principal";
import OverviewBackend from "./Home/OverviewManage";

function App() {
  const [title, setTitle] = useState("Home");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState({ error: false, data: "" });
  const [searchItem, setSearchItem] = useState("");

  // Principal Section
  const [getPrincipalApiData, setPrincipalApiData] = useState([]);
  const [postPrincipalApiData, setPostPrincipalApiData] = useState({
    post: false,
    data: {},
  });
  const [updatePrincipal, setUpdatePrincipal] = useState({
    update: false,
    data: {},
  });

  // OverView Section
  const [getOverViewApiData, setOverviewApiData] = useState([]);

  // StudentInfo Api Section
  const [getApiData, setGetApiData] = useState([]);
  const [postApiData, setPostApiData] = useState({ post: false, data: {} });
  const [deleteStudent, setDeleteStudent] = useState({
    delete: false,
    data: {},
  });
  const [updateStudent, setUpdateStudent] = useState({
    update: false,
    data: {},
  });

  // Students Section
  const [isEdit, setIsEdit] = useState({ edit: false, data: {} });
  const [isAdd, setIsAdd] = useState(false);
  const [isTable, setIsTable] = useState(true);

  // class Table Section
  const [isStudentList, setIsStudentList] = useState({
    student: false,
    data: {},
  });
  const [getClassApiData, setGetClassApiData] = useState([]);
  const [deleteClass, setDeleteClass] = useState({ delete: false, data: {} });
  const [isClassAdd, setIsClassAdd] = useState(false);
  const [postClassApiData, setPostClassApiData] = useState({
    post: false,
    data: {},
  });

  //Attendance section
  const [getAttendanceApiData, setAttendanceApiData] = useState([]);
  const [postAttendanceData, setPostAttendanceData] = useState({
    post: false,
    data: {},
  });
  const [updateAttendanceData, setUpdateAttendanceData] = useState({
    update: false,
    data: {},
  });

  // Event Section
  const [isEventAdd, setIsEventAdd] = useState(false);

  const [getEventApiData, setEventApiData] = useState([]);
  const [postEventData, setPostEventData] = useState({
    post: false,
    data: {},
  });
  const [updateEventData, setUpdateEventData] = useState({
    update: false,
    data: {},
  });
  const [deleteEvent, setDeleteEvent] = useState({
    delete: false,
    data: {},
  });

  // TimeTable
  const [timeTable, setTimeTable] = useState("");
  const [isTimeTableEdit, setIsTimeTableEdit] = useState({
    edit: true,
    data: {},
  });
  const [getTimeTableApiData, setGetTimeTableApiData] = useState([]);
  const [updateTimeTable, setUpdateTimeTable] = useState({
    update: false,
    data: {},
  });

  // Teachers section
  const [isTeacherAdd, setIsTeacherAdd] = useState(false);
  const [isTeacherEdit, setIsTeacherEdit] = useState({ edit: false, data: {} });
  const [isTeacherTable, setIsTeacherTable] = useState(true);

  const [getTeacherApiData, setGetTeacherApiData] = useState([]);
  const [postTeacherApiData, setPostTeacherApiData] = useState({
    post: false,
    data: {},
  });
  const [deleteTeacher, setDeleteTeacher] = useState({
    delete: false,
    data: {},
  });
  const [updateTeacher, setUpdateTeacher] = useState({
    update: false,
    data: {},
  });

  function Pages() {
    if (title === "Class-Table") {
      return <ClassTable />;
    } else if (title === "Students") {
      return <Main />;
    } else if (title === "Teachers") {
      return <TeachersHandler />;
    } else if (title === "Home") {
      return <Home />;
    }
  }

  const properties = {
    title,
    setTitle,
    isLoading,
    setIsLoading,
    error,
    setError,
    searchItem,
    setSearchItem,

    // Principal
    getPrincipalApiData,
    setPrincipalApiData,
    postPrincipalApiData,
    setPostPrincipalApiData,
    updatePrincipal,
    setUpdatePrincipal,

    // Overview
    getOverViewApiData,
    setOverviewApiData,

    // Students
    isEdit,
    setIsEdit,
    isAdd,
    setIsAdd,
    isTable,
    setIsTable,

    //StudentInfo Backend section
    setGetApiData,
    getApiData,
    postApiData,
    setPostApiData,
    deleteStudent,
    setDeleteStudent,
    updateStudent,
    setUpdateStudent,

    // ClassTable
    isStudentList,
    setIsStudentList,
    isClassAdd,
    setIsClassAdd,
    isTimeTableEdit,
    setIsTimeTableEdit,

    getClassApiData,
    setGetClassApiData,
    deleteClass,
    setDeleteClass,
    postClassApiData,
    setPostClassApiData,

    // Attendance Section
    getAttendanceApiData,
    setAttendanceApiData,
    postAttendanceData,
    setPostAttendanceData,
    updateAttendanceData,
    setUpdateAttendanceData,

    // Event Section
    isEventAdd,
    setIsEventAdd,

    getEventApiData,
    setEventApiData,
    postEventData,
    setPostEventData,
    updateEventData,
    setUpdateEventData,
    deleteEvent,
    setDeleteEvent,

    // TimeTable
    timeTable,
    setTimeTable,
    getTimeTableApiData,
    setGetTimeTableApiData,
    updateTimeTable,
    setUpdateTimeTable,

    //Teacher section
    isTeacherAdd,
    setIsTeacherAdd,
    isTeacherEdit,
    setIsTeacherEdit,
    isTeacherTable,
    setIsTeacherTable,

    setGetTeacherApiData,
    getTeacherApiData,
    postTeacherApiData,
    setPostTeacherApiData,
    deleteTeacher,
    setDeleteTeacher,
    updateTeacher,
    setUpdateTeacher,
  };

  return (
    <Context.Provider value={properties}>
      <div className="container">
        <Nav />
        <Pages />
      </div>
      <StudentInfoBackend />
      <ClassListBackend />
      <TeacherInfoBackend />
      <TimeTableBackend />
      <AttendanceBackend />
      <EventBackend />
      <PrincipalBackend />
      <OverviewBackend />
    </Context.Provider>
  );
}

export default App;
