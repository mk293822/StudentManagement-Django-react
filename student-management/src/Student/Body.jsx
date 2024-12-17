import TableRow from "./TableRow";
import "./css/Body.css";
import EditStudent from "./EditStudent";
import AddStudent from "./AddStudent";
import { useContext } from "react";
import { Context } from "../Context";
import Loading from "../Loading";
import Error from "../Error";

function Main() {
  const {
    isLoading,
    error,
    isTable,
    setIsTable,
    isEdit,
    setIsEdit,
    isAdd,
    setIsAdd,
    getApiData,
  } = useContext(Context);

  function addStudentHandler() {
    setIsAdd(true);
    setIsTable(false);
    setIsEdit(false);
  }

  if (isLoading) {
    return <Loading />;
  } else if (error.error) {
    return <Error />;
  } else if (isAdd) {
    return <AddStudent />;
  } else if (isEdit.edit) {
    return <EditStudent />;
  } else if (isTable) {
    if (getApiData != "") {
      return (
        <main className="main-container">
          <div className={`table-container`}>
            <table>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Grade</th>
                  <th>Email</th>
                  <th>Class Name</th>
                  <th colSpan={2}>
                    <button onClick={addStudentHandler}>
                      <h1>AddStudent</h1>
                    </button>
                  </th>
                </tr>
              </thead>
              <TableRow />
            </table>
          </div>
        </main>
      );
    } else {
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
    }
  }
}

export default Main;
