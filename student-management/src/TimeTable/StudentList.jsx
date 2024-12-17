import "./css/ClassTable.css";
import { useContext } from "react";
import { Context } from "../Context";

function StudentList() {
  const {
    isStudentList,
    getApiData,
    setPostAttendanceData,
    setUpdateAttendanceData,
    getAttendanceApiData,
  } = useContext(Context);

  const data = isStudentList.data;
  const students = getApiData.filter(
    (student) => student.class_name === data.id
  );

  // Function to handle attendance status
  function StatusHandler(student, status) {
    const today = new Date().toISOString().split("T")[0];

    // Check if the attendance data already exists for the student today
    const existingAttendance = getAttendanceApiData.find(
      (data) => data.student === student.id && data.date === today
    );

    if (!existingAttendance) {
      // If no existing record, post new attendance
      const attendanceData = {
        student: student.id,
        date: today,
        status: status,
      };
      setPostAttendanceData({ post: true, data: attendanceData });
    } else {
      // If there's an existing record, update attendance
      setUpdateAttendanceData({
        update: true,
        data: {
          id: existingAttendance.id,
          student: existingAttendance.student,
          date: existingAttendance.date,
          status: status,
        },
      });
    }
  }

  if (students.length == 0) {
    return (
      <main className="main-container">
        <div className="table-container no-data">
          <h1>No Student Has Applied</h1>
          <button onClick={addStudentHandler}>
            <h1>AddStudent</h1>
          </button>
        </div>
      </main>
    );
  } else {
    return (
      <div className="studentList-table-container">
        <h2>
          Student List Of Grade-{data.grade} class {data.name}
        </h2>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {students.map((data) => {
              return (
                <tr key={data.id}>
                  <td>{data.id}</td>
                  <td>{data.name}</td>
                  <td>{data.age}</td>
                  <td>{data.gender === "M" ? "Male" : "Female"}</td>
                  <td>{data.email}</td>
                  <td>
                    <button onClick={(e) => StatusHandler(data, "Present")}>
                      Present
                    </button>
                  </td>
                  <td>
                    <button onClick={(e) => StatusHandler(data, "Absent")}>
                      Absent
                    </button>
                  </td>
                  <td>
                    <button onClick={(e) => StatusHandler(data, "Late")}>
                      Late
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
}

export default StudentList;
