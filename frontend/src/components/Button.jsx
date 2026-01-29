import React from "react";

export default function Button({ onClick, children, type = "primary" }) {
  return (
    <button className={`btn btn-${type}`} onClick={onClick}>
      {children}
    </button>
  );
}
