import React from "react";

const Spinner = () => {
  return (
    <div
      className="section"
      style={{ height: "300px", display: "flex", alignItems: "center" }}
    >
      <img
        src={require("../../../assets/images/spinner2.gif")}
        alt="loading"
        style={{
          width: "100px",
          margin: "auto",
          display: "block"
        }}
      />
    </div>
  );
};

export default Spinner;
