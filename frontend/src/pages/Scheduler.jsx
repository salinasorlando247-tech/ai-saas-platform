import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import api from "../api/api";

export default function Scheduler() {

  const [date, setDate] = useState(new Date());
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await api.get("/schedule/list");
    setPosts(res.data);
  };

  const schedule = async () => {
    await api.post("/schedule/create", { date });
    alert("Scheduled");
    load();
  };

  return (
    <div className="p-6">

      <h1 className="text-xl mb-4">Scheduler</h1>

      <Calendar onChange={setDate} value={date} />

      <button onClick={schedule}
        className="bg-blue-600 text-white p-2 mt-4">
        Schedule Post
      </button>

      <ul className="mt-4">
        {posts.map(p => (
          <li key={p.id}>{new Date(p.date).toLocaleString()}</li>
        ))}
      </ul>

    </div>
  );
}
