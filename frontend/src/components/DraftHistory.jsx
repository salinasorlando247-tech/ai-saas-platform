import React, { useEffect, useState } from "react";
import axios from "axios";

function DraftHistory() {
  const [drafts, setDrafts] = useState([]);

  useEffect(() => {
    const fetchDrafts = async () => {
      const res = await axios.get("http://localhost:5000/drafts");
      setDrafts(res.data);
    };
    fetchDrafts();
  }, []);

  return (
    <div>
      <h2>Draft History</h2>
      <ul>
        {drafts.map((d) => (
          <li key={d.id}>
            {d.content} - {d.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DraftHistory;
