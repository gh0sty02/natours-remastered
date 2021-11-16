import React from "react";

const error = ({ type, msg }) => {
  return <div className={`"alert alert--${type}"`}>${msg}</div>;
};

export default error;
