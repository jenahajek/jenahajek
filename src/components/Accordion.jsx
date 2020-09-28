import React, { useState } from "react";

const Accordion = ({ title, label, state, children }) => {
  const [accordionState, setAccordionState] = useState("");
  const [accordionIndicator, setAccordionIndicator] = useState("");

  const toggleAccordion = () => {
    setAccordionState(accordionState === "" ? "is-open" : "");
    setAccordionIndicator(
      state.length === 0 || state === undefined ? "" : "is-active"
    );
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
          children.length ? "" : "is-empty"
        }`}>
        {title}
      </button>
      <div className="filter__content accordion__content">
        {children.length ? children : <p>-</p>}
      </div>
    </div>
  );
};

export default Accordion;
