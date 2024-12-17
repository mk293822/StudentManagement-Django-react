import { useContext } from "react";
import { Context } from "../Context";

function TeacherTable() {
  const {
    getTeacherApiData,
    setIsTeacherEdit,
    setDeleteTeacher,
    setIsTeacherAdd,
    setIsTeacherTable,
  } = useContext(Context);

  function deleteHandler(data) {
    if (window.confirm(`Are You Sure To Delete Student '${data.name}'`)) {
      setDeleteTeacher({ delete: true, data: data });
    } else {
      setDeleteTeacher({ delete: false, data: {} });
    }
  }

  function updateHandler(data) {
    setIsTeacherEdit({ edit: true, data: data });
    setIsTeacherAdd(false);
    setIsTeacherTable(false);
  }

  function addTeacherHandler() {
    setIsTeacherAdd(true);
    setIsTeacherEdit({ edit: false, data: {} });
    setIsTeacherTable(false);
  }

  return (
    <main className="main-container">
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Grade</th>
              <th>Main Subject</th>
              <th>Email</th>
              <th colSpan={2}>
                <button onClick={addTeacherHandler}>
                  <h1>AddTeacher</h1>
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {getTeacherApiData.map((data, index) => {
              return (
                <tr key={data.id}>
                  <td>{index + 1}</td>
                  <td>{data.name}</td>
                  <td>{data.age}</td>
                  <td>{data.gender === "M" ? "Male" : "Female"}</td>
                  <td>G-{data.grade}</td>
                  <td>{data.main_subject}</td>
                  <td>{data.email}</td>
                  <td>
                    <button onClick={() => deleteHandler(data)}>Delete</button>
                  </td>
                  <td>
                    <button onClick={() => updateHandler(data)}>Update</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default TeacherTable;
