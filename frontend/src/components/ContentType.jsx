import React, { useState } from "react";

function ContentType() {
  const [type, setType] = useState("");

  return (
    <div className="component-box">
      <h2>Content Type</h2>
      <input value={type} onChange={(e) => setType(e.target.value)} placeholder="Content Type" />
    </div>
  );
}

export default ContentType;
