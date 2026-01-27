import React from "react";

const OtherButtons = () => {
  const buttons = [
    "Generate Caption",
    "Optimize Hashtags",
    "Content Idea Generator",
    "AI Insights"
  ];

  return (
    <>
      {buttons.map((btn, i) => (
        <button key={i} onClick={() => alert(`${btn} clicked!`)}>
          {btn}
        </button>
      ))}
    </>
  );
};

export default OtherButtons;
