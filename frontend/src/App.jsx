import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import Analytics from "./components/Analytics";
import Platforms from "./components/Platforms";
import Payments from "./components/Payments";
import DraftHistory from "./components/DraftHistory";
import CreatePost from "./components/CreatePost";
import VideoEditor from "./components/VideoEditor";
import AutoVideoCreator from "./components/AutoVideoCreator";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/platforms" element={<Platforms />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/drafts" element={<DraftHistory />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/video-editor" element={<VideoEditor />} />
        <Route path="/auto-video" element={<AutoVideoCreator />} />
      </Routes>
    </Router>
  );
}
