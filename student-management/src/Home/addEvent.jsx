import { useContext } from "react";
import { Context } from "../Context";

function AddEvent() {
  const { setPostEventData, setIsEventAdd } = useContext(Context);

  function eventAddHandler(e) {
    e.preventDefault();
    const inputs = e.target;
    const data = {
      name: inputs.name.value,
      description: inputs.description.value,
      date: `${inputs.date.value}T${inputs.time.value}`,
    };

    setPostEventData({ post: true, data: data });
  }

  return (
    <section>
      <div className="user-edit-container">
        <h2>Teacher Add Form</h2>
        <div className="image-container">
          <img src="" alt="" />
        </div>
        <form action="" onSubmit={eventAddHandler}>
          <label htmlFor="name">Name: </label>
          <input type="text" name="name" required />
          <label htmlFor="description">Description: </label>
          <input type="text" name="description" required />
          <label htmlFor="date">Date: </label>
          <input type="date" name="date" required />
          <label htmlFor="time">Time: </label>
          <input type="time" name="time" />
          <div className="blank"></div>
          <div className="btn-container">
            <input
              type="button"
              value="Cancel"
              className="close-btn"
              onClick={() => setIsEventAdd(false)}
            />
            <input type="submit" value="Add" />
          </div>
        </form>
      </div>
    </section>
  );
}

export default AddEvent;
