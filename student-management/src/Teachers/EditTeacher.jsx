import { useContext } from "react";
import { Context } from "../Context";

function EditTeacher() {
  const {
    isTeacherEdit,
    setIsTeacherEdit,
    setUpdateTeacher,
    setIsTeacherTable,
  } = useContext(Context);

  function inputChangeHandler(e) {
    if (e) {
      const { name, value } = e.target;
      setIsTeacherEdit({
        edit: true,
        data: { ...isTeacherEdit.data, [name]: value },
      });
    }
  }

  function submitChangeHandler(e) {
    let data = isTeacherEdit.data;
    setUpdateTeacher({ update: true, data: data });
    setIsTeacherTable(true);
  }

  function cancelHandler() {
    setIsTeacherEdit({ edit: false, data: {} });
    setIsTeacherTable(true);
  }

  return (
    <section>
      <div className={`user-edit-container`}>
        <h2>Teacher Edit Form</h2>
        <div className="image-container">
          <img src="" alt="" />
        </div>
        {console.log(isTeacherEdit)}
        <form action="" onSubmit={submitChangeHandler}>
          <input type="hidden" name="id" placeholder={isTeacherEdit.data.id} />
          <label htmlFor="name">Name: </label>
          <input
            value={isTeacherEdit.data.name}
            onChange={inputChangeHandler}
            type="text"
            name="name"
          />
          <label htmlFor="Age">Age: </label>
          <input
            value={isTeacherEdit.data.age}
            min="20"
            max="80"
            onChange={inputChangeHandler}
            type="number"
            name="age"
          />

          <label htmlFor="gender">Gender: </label>
          <select
            name="gender"
            value={isTeacherEdit.data.gender}
            onChange={inputChangeHandler}
          >
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
          <label htmlFor="grade">Grade: </label>
          <input
            value={isTeacherEdit.data.grade}
            min="1"
            max="12"
            onChange={inputChangeHandler}
            type="number"
            name="grade"
          />
          <label htmlFor="main_subject">Main Subject: </label>
          <input
            value={isTeacherEdit.data.main_subject}
            onChange={inputChangeHandler}
            type="text"
            name="main_subject"
          />
          <label htmlFor="email">Email: </label>
          <input
            value={isTeacherEdit.data.email}
            onChange={inputChangeHandler}
            type="email"
            name="email"
          />
          <div className="blank"></div>
          <div className="btn-container">
            <input
              type="button"
              value="Cancel"
              onClick={cancelHandler}
              className="close-btn"
            />
            <input type="submit" value="Update" />
          </div>
        </form>
      </div>
    </section>
  );
}

export default EditTeacher;
