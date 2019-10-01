import React from "react";

const Spinner = ({ classNames, height, spinnerSize }) => {
  return (
    <div
      className={classNames ? classNames : "section"}
      style={{
        height: height ? height : "300px",
        display: "flex",
        alignItems: "center"
      }}
    >
      <img
        src={require("../../../assets/images/spinner2.gif")}
        alt="loading"
        style={{
          width: spinnerSize ? spinnerSize : "100px",
          margin: "auto",
          display: "block"
        }}
      />
    </div>
  );
};

export default Spinner;
