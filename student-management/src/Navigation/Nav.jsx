import "./css/Nav.css";
import { useContext } from "react";
import { Context } from "../Context";
import debounce from "lodash.debounce";

function Nav() {
  const { title, setTitle, setSearchItem } = useContext(Context);

  const searchHandler = debounce((e) => {
    setSearchItem(e.target.value);
  }, 1000);

  return (
    <nav className="nav">
      <h1>
        <span>
          <img src="/MKT_loge.png" id="main-logo" />
        </span>{" "}
        MKT Education Center
      </h1>
      <div className="search-container">
        <label htmlFor="search">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#ccffff"
          >
            <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
          </svg>
        </label>
        <input
          type="search"
          id="search"
          name="q"
          onChange={searchHandler}
          placeholder="Search by Name ....."
        />
      </div>
      <ul>
        <li
          className={title === "Home" ? "active" : "inactive"}
          onClick={() => setTitle("Home")}
        >
          <h1>Home</h1>
        </li>
        <li
          className={title === "Class-Table" ? "active" : "inactive"}
          onClick={() => setTitle("Class-Table")}
        >
          <h1>Classes-Table</h1>
        </li>
        <li
          className={title === "Students" ? "active" : "inactive"}
          onClick={() => setTitle("Students")}
        >
          <h1>Students</h1>
        </li>
        <li
          className={title === "Teachers" ? "active" : "inactive"}
          onClick={() => setTitle("Teachers")}
        >
          <h1>Teachers</h1>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
