import React, { useState } from "react";

export default function Platforms({ selected, setSelected }) {
  const platforms = ["YouTube", "TikTok", "Instagram", "LinkedIn", "Snapchat"];

  const togglePlatform = (name) => {
    if (selected.includes(name)) {
      setSelected(selected.filter((p) => p !== name));
    } else {
      setSelected([...selected, name]);
    }
  };

  return (
    <div className="platforms">
      <h2>Select Platforms</h2>
      <div className="platform-buttons">
        {platforms.map((platform) => (
          <button
            key={platform}
            className={selected.includes(platform) ? "active" : ""}
            onClick={() => togglePlatform(platform)}
          >
            {platform}
          </button>
        ))}
      </div>
    </div>
  );
}
