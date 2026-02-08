import { useEffect, useState } from "react";
import { socket } from "../lib/Socket";

export default function JobProgress({ jobId }) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Starting...");

  useEffect(() => {
    socket.emit("join-job", jobId);

    socket.on("job-progress", (data) => {
      setProgress(data.progress);
      setStatus(data.status);
    });

    return () => {
      socket.off("job-progress");
    };
  }, [jobId]);

  return (
    <div className="w-full bg-zinc-900 p-4 rounded-lg">
      <div className="text-sm mb-2">{status}</div>
      <div className="w-full bg-zinc-700 h-2 rounded">
        <div
          className="bg-emerald-500 h-2 rounded transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="text-xs mt-1">{progress}%</div>
    </div>
  );
}
