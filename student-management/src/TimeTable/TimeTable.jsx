import "./css/ClassTable.css";
import { useContext } from "react";
import { Context } from "../Context";
import { useState } from "react";

function TimeTable() {
  const {
    isTimeTableEdit,
    setIsTimeTableEdit,
    getTimeTableApiData,
    timeTable,
    setUpdateTimeTable,
  } = useContext(Context);

  const datas = getTimeTableApiData.filter(
    (table) => table.class_name === timeTable.data.id
  );

  const [localData, setLocalData] = useState(datas);

  // Handle input change for each field
  function inputChangeHandler(e, index, field) {
    const updatedData = [...localData];
    updatedData[index][field] = e.target.value === "-" ? null : e.target.value;
    setLocalData(updatedData);
  }

  function formSubmitHandler(e, index) {
    if (isTimeTableEdit !== index) {
      setIsTimeTableEdit(index);
    } else {
      setUpdateTimeTable({ update: true, data: localData[index] });
    }
  }

  return (
    <div className="time-table-container">
      <table>
        <thead>
          <tr>
            <td colSpan={8}>
              <h1>Grade {12} Time-Table</h1>
            </td>
          </tr>
          <tr>
            <th>Days/Time</th>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
            <th>5</th>
            <th>6</th>
            <th>7</th>
          </tr>
        </thead>
        <tbody>
          {datas.map((data, index) => {
            return (
              <tr key={data.id}>
                <td>{data.day}</td>
                <td>
                  <input
                    onChange={(e) => inputChangeHandler(e, index, "T_1")}
                    value={data.T_1 === null ? "-" : data.T_1}
                    readOnly={isTimeTableEdit !== index}
                  />
                </td>
                <td>
                  <input
                    onChange={(e) => inputChangeHandler(e, index, "T_2")}
                    value={data.T_2 === null ? "-" : data.T_2}
                    readOnly={isTimeTableEdit !== index}
                  />
                </td>
                <td>
                  <input
                    onChange={(e) => inputChangeHandler(e, index, "T_3")}
                    value={data.T_3 === null ? "-" : data.T_3}
                    readOnly={isTimeTableEdit !== index}
                  />
                </td>
                <td>
                  <input
                    onChange={(e) => inputChangeHandler(e, index, "T_4")}
                    value={data.T_4 === null ? "-" : data.T_4}
                    readOnly={isTimeTableEdit !== index}
                  />
                </td>
                <td>
                  <input
                    onChange={(e) => inputChangeHandler(e, index, "T_5")}
                    value={data.T_5 === null ? "-" : data.T_5}
                    readOnly={isTimeTableEdit !== index}
                  />
                </td>
                <td>
                  <input
                    onChange={(e) => inputChangeHandler(e, index, "T_6")}
                    value={data.T_6 === null ? "-" : data.T_6}
                    readOnly={isTimeTableEdit !== index}
                  />
                </td>
                <td>
                  <input
                    onChange={(e) => inputChangeHandler(e, index, "T_7")}
                    value={data.T_7 === null ? "-" : data.T_7}
                    readOnly={isTimeTableEdit !== index}
                  />
                </td>
                <td colSpan={2}>
                  <button
                    type="submit"
                    onClick={(e) => formSubmitHandler(e, index)}
                  >
                    {isTimeTableEdit !== index ? "Edit" : "Update"}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TimeTable;
