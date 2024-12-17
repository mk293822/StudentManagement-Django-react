import "./css/UserEdit.css";
import { useContext } from "react";
import { Context } from "../Context";

function AddStudent() {
  const { setPostApiData, setIsAdd, setIsTable, getClassApiData } =
    useContext(Context);

  function cancelBtnHandler(e) {
    const inputs = e.target.parentElement.parentElement;
    inputs.name.value = "";
    inputs.age.value = "";
    inputs.gender.value = "";
    inputs.email.value = "";
    inputs.class_name.value = "";
    setPostApiData({ post: false, data: {} });
    setIsAdd(false);
    setIsTable(true);
  }

  function studentAddHandler(e) {
    e.preventDefault();
    const inputs = e.target;
    const selectedClass = inputs.class_name.value; // This will get the selected class data.

    // Now, find the class object from getClassApiData by comparing the name
    const classData = getClassApiData.find(
      (data) => `${data.name},${data.grade}` === selectedClass
    );

    if (classData) {
      const data = {
        name: inputs.name.value,
        age: inputs.age.value,
        gender: inputs.gender.value === "Male" ? "M" : "F",
        email: inputs.email.value,
        class_name: classData.id, // Get the class ID
        grade: classData.grade, // You can also use the grade separately if needed
      };

      setPostApiData({ post: true, data: data });
    } else {
      alert("Class Does Not Exist!");
    }
  }

  return (
    <section>
      <div className="user-edit-container">
        <h2>Student Add Form</h2>
        <div className="image-container">
          <img src="" alt="" />
        </div>
        <form onSubmit={studentAddHandler}>
          <label htmlFor="name">Name: </label>
          <input type="text" name="name" required />

          <label htmlFor="age">Age: </label>
          <input type="number" name="age" min="5" max="120" required />

          <label htmlFor="gender">Gender: </label>
          <select name="gender" required>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <label htmlFor="email">Email: </label>
          <input type="email" name="email" required />

          <label htmlFor="class_name">Class Name: </label>
          <select name="class_name" required>
            {getClassApiData.map((data) => {
              return (
                <option key={data.id} value={`${data.name},${data.grade}`}>
                  Grade-{data.grade} Class-{data.name}
                </option>
              );
            })}
          </select>

          <label htmlFor="image">Profile Image: </label>
          <input type="file" name="image" accept="image/*" />

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

export default AddStudent;
