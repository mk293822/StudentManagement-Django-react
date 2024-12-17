import "./css/ClassTable.css";
import { useContext } from "react";
import { Context } from "../Context";
import TimeTable from "./TimeTable";
import ClassList from "./ClassList";
import StudentList from "./StudentList";
import AddClass from "./AddClass";

function ClassTable() {
  const {
    timeTable,
    isStudentList,
    isClassAdd,
    getClassApiData,
    setIsClassAdd,
    setIsStudentList,
  } = useContext(Context);

  function classAddHandler() {
    setIsClassAdd(true);
  }

  function Pages() {
    if (timeTable.table) {
      return <TimeTable />;
    } else if (isStudentList.student) {
      return <StudentList />;
    } else if (isClassAdd) {
      return <AddClass />;
    }
    if (getClassApiData != "") {
      return <ClassList />;
    } else {
      return (
        <main className="main-container">
          <div className="table-container no-data">
            <h1>No Class Has Created</h1>
            <button onClick={classAddHandler}>
              <h1>Add Class</h1>
            </button>
          </div>
        </main>
      );
    }
  }

  return (
    <main className="class-table-main">
      <Pages />
    </main>
  );
}

export default ClassTable;
