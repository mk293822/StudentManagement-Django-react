import "./css/ClassTable.css";
import { useContext } from "react";
import { Context } from "../Context";

function AddClass() {
  const {
    setIsStudentList,
    setIsClassAdd,
    setPostClassApiData,
    getTeacherApiData,
    postClassApiData,
  } = useContext(Context);

  function cancelBtnHandler(e) {
    const inputs = e.target.parentElement.parentElement;
    inputs.grade.value = "";
    inputs.class_name.value = "";
    inputs.class_teacher.value = "";
    setIsClassAdd(false);
    setIsStudentList({ student: false, data: {} });
  }

  function classAddHandler(e) {
    e.preventDefault();
    const inputs = e.target;
    const class_teacher_data = getTeacherApiData.find(
      (data) => data.id == inputs.class_teacher.value
    );
    if (class_teacher_data) {
      const data = {
        grade: Number(inputs.grade.value),
        name: inputs.class_name.value,
        class_teacher: class_teacher_data.id,
        classTeacherName: class_teacher_data.name,
      };
      // console.log([data]);
      setPostClassApiData({ post: true, data: data });
      // console.log(postClassApiData.post);
    } else {
      alert("Class Teacher Does Not Exist!");
    }
    setIsClassAdd(false);
  }

  return (
    <section className="class-add-container">
      <div className="user-edit-container">
        <h2>Class Add Form</h2>
        <div className="image-container">
          <img src="" alt="" />
        </div>
        <form action="" onSubmit={classAddHandler}>
          <label htmlFor="grade">Grade: </label>
          <input type="number" name="grade" required />
          <label htmlFor="class_name">Class Name: </label>
          <input type="text" name="class_name" required />
          <label htmlFor="class_teacher">Class Teacher: </label>
          <select name="class_teacher">
            {getTeacherApiData.map((teacher) => {
              return (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.name}
                </option>
              );
            })}
          </select>
          <div className="blank"></div>
          <div className="btn-container">
            <input
              type="button"
              value="Cancel"
              className="close-btn"
              onClick={cancelBtnHandler}
            />
            <input type="submit" value="Add" />
          </div>
        </form>
      </div>
    </section>
  );
}

export default AddClass;
