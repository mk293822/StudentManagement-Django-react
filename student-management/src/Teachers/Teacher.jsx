import { useContext } from "react";
import { Context } from "../Context";
import Loading from "../Loading";
import Error from "../Error";
import AddTeacher from "./AddTeacher";
import EditTeacher from "./EditTeacher";
import TeacherTable from "./TeacherTable";

function TeachersHandler() {
  const {
    isLoading,
    error,
    isTeacherAdd,
    isTeacherEdit,
    isTeacherTable,
    setIsTeacherAdd,
    setIsTeacherEdit,
    setIsTeacherTable,
    getTeacherApiData,
  } = useContext(Context);

  function addTeacherHandler() {
    setIsTeacherAdd(true);
    setIsTeacherEdit({ edit: false, data: {} });
    setIsTeacherTable(false);
  }

  if (isLoading) {
    return <Loading />;
  } else if (error.error) {
    return <Error />;
  } else if (isTeacherAdd) {
    return <AddTeacher />;
  } else if (isTeacherEdit.edit) {
    return <EditTeacher />;
  } else if (isTeacherTable) {
    if (getTeacherApiData != "") {
      return <TeacherTable />;
    } else {
      return (
        <main className="main-container">
          <div className="table-container no-data">
            <h1>No Teacher Has Applied</h1>
            <button onClick={addTeacherHandler}>
              <h1>Add Teacher</h1>
            </button>
          </div>
        </main>
      );
    }
  }
}

export default TeachersHandler;
