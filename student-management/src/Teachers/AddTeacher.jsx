import { useContext } from "react";
import { Context } from "../Context";

function AddTeacher() {
  const { setPostTeacherApiData, setIsTeacherAdd, setIsTeacherTable } =
    useContext(Context);

  function cancelBtnHandler(e) {
    const inputs = e.target.closest("form");
    inputs.name.value = "";
    inputs.age.value = "";
    inputs.gender.value = "Male";
    inputs.grade.value = "";
    inputs.main_subject.value = "";
    inputs.email.value = "";
    setPostTeacherApiData({ post: false, data: {} });
    setIsTeacherAdd(false);
    setIsTeacherTable(true);
  }

  function teacherAddHandler(e) {
    e.preventDefault();
    const inputs = e.target;
    const data = {
      name: inputs.name.value,
      age: inputs.age.value,
      gender: inputs.gender.value === "Male" ? "M" : "F",
      grade: inputs.grade.value,
      main_subject: inputs.main_subject.value,
      email: inputs.email.value,
    };

    if (!data.name || !data.age || !data.email) {
      alert("Please fill out all required fields.");
      return;
    }

    setPostTeacherApiData({ post: true, data: data });
  }

  return (
    <section>
      <div className="user-edit-container">
        <h2>Teacher Add Form</h2>
        <div className="image-container">
          <img src="" alt="" />
        </div>
        <form action="" onSubmit={teacherAddHandler}>
          <label htmlFor="name">Name: </label>
          <input type="text" name="name" required />
          <label htmlFor="Age">Age: </label>
          <input type="number" min="20" max="80" name="age" required />
          <label htmlFor="gender">Gender: </label>
          <select name="gender" required>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <label htmlFor="grade">Grade: </label>
          <input min="1" max="12" type="number" name="grade" required />
          <label htmlFor="main_subject">Main Subject: </label>
          <input type="text" name="main_subject" required />
          <label htmlFor="email">Email: </label>
          <input type="email" name="email" required />
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

export default AddTeacher;
