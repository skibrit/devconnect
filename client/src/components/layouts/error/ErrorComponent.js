import React from "react";

const ErrorComponent = ({ title, msg }) => {
  return (
    <div className="section">
      <h2>
        {title}
      </h2>
      <p>
        {msg}
      </p>
    </div>
  );
};

export default ErrorComponent;
