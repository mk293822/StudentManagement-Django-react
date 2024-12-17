import "./css/UserEdit.css";
import { useContext } from "react";
import { Context } from "../Context";

function EditStudent() {
  const { isEdit, setIsEdit, setUpdateStudent, setIsTable, getClassApiData } =
    useContext(Context);

  // Handle input changes
  function inputChangeHandler(e) {
    const { name, value, files } = e.target;
    if (name === "class_name") {
      const [className, grade] = value.split(",");
      const class_id = getClassApiData.find((data) => data.id == className);
      setIsEdit({
        edit: true,
        data: {
          ...isEdit.data,
          class_name: class_id.id,
          grade: grade,
        }, // Update both values in the state
      });
    } else {
      if (files) {
        // Handle file upload
        setIsEdit({
          edit: true,
          data: { ...isEdit.data, [name]: files[0] },
        });
      } else {
        // Handle regular input fields
        setIsEdit({
          edit: true,
          data: { ...isEdit.data, [name]: value },
        });
      }
    }
  }

  // Handle form submission
  function submitChangeHandler(e) {
    e.preventDefault(); // Prevent form submission reload
    let data = isEdit.data;
    setUpdateStudent({ update: true, data: data });
    setIsTable(true);
  }

  // Cancel editing
  function cancelHandler() {
    setIsEdit({ edit: false, data: {} });
    setIsTable(true);
  }

  return (
    <section>
      <div className="user-edit-container">
        <h2>Student Edit Form</h2>
        <div className="image-container">
          <img src={isEdit.data.image || ""} alt="Profile" />
        </div>
        <form onSubmit={submitChangeHandler}>
          <input type="hidden" name="id" value={isEdit.data.id} />

          <label htmlFor="name">Name: </label>
          <input
            value={isEdit.data.name}
            onChange={inputChangeHandler}
            type="text"
            name="name"
          />

          <label htmlFor="age">Age: </label>
          <input
            value={isEdit.data.age}
            min="5"
            max="20"
            onChange={inputChangeHandler}
            type="number"
            name="age"
          />

          <label htmlFor="gender">Gender: </label>
          <select
            name="gender"
            value={isEdit.data.gender}
            onChange={inputChangeHandler}
          >
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>

          <label htmlFor="email">Email: </label>
          <input
            value={isEdit.data.email}
            onChange={inputChangeHandler}
            type="email"
            name="email"
          />

          <label htmlFor="class_name">Class Name: </label>
          <select
            name="class_name"
            value={isEdit.data.class_name + "," + isEdit.data.grade}
            onChange={inputChangeHandler}
            required
          >
            {getClassApiData.length > 0 ? (
              getClassApiData.map((data) => {
                const classOptionValue = `${data.id},${data.grade}`;
                return (
                  <option key={data.id} value={classOptionValue}>
                    Grade-{data.grade} Class-{data.name}
                  </option>
                );
              })
            ) : (
              <option value="">No classes available</option>
            )}
          </select>

          <label htmlFor="image">Profile Image: </label>
          <input
            type="file"
            name="image"
            onChange={inputChangeHandler}
            accept="image/*"
          />

          <div className=""></div>

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

export default EditStudent;
