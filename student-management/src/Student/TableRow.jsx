import "./css/Body.css";
import { useContext } from "react";
import { Context } from "../Context";

function TableRow() {
  const { getApiData, setIsEdit, setDeleteStudent, setIsTable, setIsAdd } =
    useContext(Context);

  function deleteHandler(data) {
    if (window.confirm(`Are You Sure To Delete Student '${data.name}'`)) {
      setDeleteStudent({ delete: true, data: data });
    } else {
      setDeleteStudent({ delete: false, data: {} });
    }
  }

  function updateHandler(data) {
    setIsEdit({ edit: true, data: data });
    setIsTable(false);
    setIsAdd(false);
  }

  return (
    <tbody>
      {getApiData.map((data, index) => (
        <tr key={data.id}>
          <td>{index + 1}</td>
          <td>{data.name}</td>
          <td>{data.age}</td>
          <td>{data.gender === "M" ? "Male" : "Female"}</td>
          <td>G-{data.grade}</td>
          <td>{data.email}</td>
          <td>{data.className}</td>
          <td>
            <button onClick={() => deleteHandler(data)}>Delete</button>
          </td>
          <td>
            <button onClick={() => updateHandler(data)}>Update</button>
          </td>
        </tr>
      ))}
    </tbody>
  );
}

export default TableRow;
