import React, { useState, useEffect } from "react";

const GuidelinesSwitch = () => {
  const [guidelinesState, setGuidelinesState] = useState("");
  const [toggleGuidelinesChecked, setToggleGuidelinesChecked] = useState(false);

  useEffect(() => {
    setGuidelines();
  }, []);

  const setGuidelines = () => {
    const currentGuidelines = localStorage.getItem("guidelines")
      ? localStorage.getItem("guidelines")
      : null;
    const currentToggleGuidelines = currentGuidelines === "on";
    setGuidelinesState(currentGuidelines);
    setToggleGuidelinesChecked(currentToggleGuidelines);
    document.documentElement.setAttribute("data-guidelines", currentGuidelines);
    localStorage.setItem("guidelines", currentGuidelines); // add this
  };

  const toggleGuidelines = () => {
    const updatedGuidelines = guidelinesState === "on" ? "off" : "on";
    const updatedToggleGuidelines = updatedGuidelines === "on";
    setGuidelinesState(updatedGuidelines);
    setToggleGuidelinesChecked(updatedToggleGuidelines);
    document.documentElement.setAttribute("data-guidelines", updatedGuidelines);
    localStorage.setItem("guidelines", updatedGuidelines); // add this
  };

  return (
    <div className="switch switch--guidelines">
      <label className="switch__label" htmlFor="checkbox">
        <input
          type="checkbox"
          id="checkbox"
          checked={toggleGuidelinesChecked}
          onChange={toggleGuidelines}
        />
        <div className="switch__slider" />
        <span className="u-vhide">Switch guidelines</span>
      </label>
    </div>
  );
};

export default GuidelinesSwitch;
