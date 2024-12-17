import "./css/ClassTable.css";
import { useContext } from "react";
import { Context } from "../Context";

function ClassList() {
  const {
    setTimeTable,
    setIsStudentList,
    getClassApiData,
    setDeleteClass,
    setIsClassAdd,
  } = useContext(Context);

  function classDeleteHandler(data) {
    if (window.confirm(`Are you sure to delete class ${data.name}`)) {
      setDeleteClass({ delete: true, data: data });
    } else {
      setDeleteClass({ delete: false, data: {} });
    }
  }

  function studentListHandler(data) {
    setIsStudentList({ student: true, data: data });
    setIsClassAdd(false);
  }

  function classAddHandler() {
    setIsClassAdd(true);
    setIsStudentList({ student: false, data: {} });
  }

  return (
    <div className="class-table-container">
      <table>
        <thead>
          <tr>
            <th>Grade</th>
            <th>Class</th>
            <th>Class Teacher</th>
            <th colSpan={3}>
              <button onClick={classAddHandler}>Add Class</button>
            </th>
          </tr>
        </thead>
        <tbody>
          {getClassApiData.map((data) => {
            return (
              <tr key={data.id}>
                <td>{data.grade}</td>
                <td>{data.name}</td>
                <td>{data.classTeacherName}</td>
                <td>
                  <button onClick={() => studentListHandler(data)}>
                    Student List
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => setTimeTable({ table: true, data: data })}
                  >
                    Time-Table
                  </button>
                </td>
                <td>
                  <button onClick={() => classDeleteHandler(data)}>
                    Delete Class
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ClassList;
