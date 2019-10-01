import React from "react";
import "./alert";

const AlertTemplate = ({ style, options, message, close }) =>
  <div className="alert-template">
    <div className="alert-template-wrapper">
      <p className="alert-msg">
        {" "}{message}
      </p>
      <button className="close-btn" onClick={close}>
        X
      </button>
    </div>
  </div>;

export default AlertTemplate;
