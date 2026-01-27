import React, { useEffect, useState } from "react";
import axios from "axios";

export default function PostTable({ refresh }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/posts").then(res => setPosts(res.data));
  }, [refresh]);

  return (
    <div>
      <h3>Posts Table</h3>
      <table>
        <thead>
          <tr>
            <th>Client</th>
            <th>Content</th>
            <th>Platform</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(p => (
            <tr key={p.id}>
              <td>{p.clientName}</td>
              <td>{p.content}</td>
              <td>{p.platform}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
