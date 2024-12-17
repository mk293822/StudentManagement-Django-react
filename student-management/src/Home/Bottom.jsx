import { useContext } from "react";
import { Context } from "../Context";

function Bottom() {
  const { getPrincipalApiData } = useContext(Context);
  return (
    <div className="bottom-container">
      <div className="left">
        <h3>Principal Info</h3>
        {getPrincipalApiData.map((data) => {
          return (
            <ul key={data.user.id}>
              <li>
                Name &nbsp;&nbsp;: <b>{data.user.username}</b>
              </li>
              <li>
                Age &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <b>{data.age}</b>
              </li>
              <li>
                Gender : <b>{data.gender === "M" ? "Male" : "Female"}</b>
              </li>
              <li>Phone &nbsp; : {data.phone_number}</li>
              <li>Address : {data.address}</li>
            </ul>
          );
        })}
      </div>
      <div className="hr"></div>
      <div className="right">
        <h3>Daily Tasks</h3>
        <div className="sub">
          <ol>
            <li>Check</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default Bottom;
