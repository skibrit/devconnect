import React from "react";
import LoaderSpinner from "react-loader-spinner";
import "./formloader.scss";

const FormLoader = () => {
  return (
    <div className="formLoader-spinner">
      <div className="spinner-wrapper">
        <LoaderSpinner
          type="Circles"
          color="#78c2ad"
          height={70}
          width={70}
          timeout={-1}
        />
      </div>
    </div>
  );
};

export default FormLoader;
