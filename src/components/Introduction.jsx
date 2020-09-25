import React from "react";
import { Link } from "gatsby";

const Introduction = ({ title, children }) => {
  return (
    <div className="introduction">
      <h1 className="type-h2 introduction__title">{title}</h1>
      {children}
    </div>
  );
};

export default Introduction;
