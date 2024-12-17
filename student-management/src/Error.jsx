import { useContext } from "react";
import { Context } from "./Context";
import "./css/Loading.css";

function Error(prop) {
  const { error } = useContext(Context);
  return (
    <div className="error-container">
      <h1>Error: {error.data.message}</h1>
    </div>
  );
}

export default Error;
