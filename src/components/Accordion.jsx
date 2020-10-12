import React, { useState } from "react";

const Accordion = ({ title, label, state, initialState, children }) => {
  const [accordionState, setAccordionState] = useState(
    initialState ? "is-open" : ""
  );
  const [accordionIndicator, setAccordionIndicator] = useState("");

  const toggleAccordion = () => {
    setAccordionState(accordionState === "" ? "is-open" : "");
    setAccordionIndicator(
      state.length === 0 || state === undefined ? "" : "is-active"
    );
    console.log(state, "stejt");
  };

  return (
    <div
      className={`filter__group accordion ${accordionState} ${accordionIndicator}`}
      aria-labelledby={label}>
      <button
        id={label}
        type="button"
        onClick={toggleAccordion}
        className={`filter__legend accordion__toggle ${
          children.length === 0 ? "is-empty" : ""
        }`}>
        {title}
      </button>
      <div className="filter__content accordion__content">
        {children.length === 0 ? <p>-</p> : children}
      </div>
    </div>
  );
};

export default Accordion;
