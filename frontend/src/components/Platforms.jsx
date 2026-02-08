import React from "react";

const platformsList = [
  "YouTube", "Instagram", "TikTok", "Facebook", "Twitter/X", "LinkedIn",
  "Snapchat", "Pinterest", "Reddit", "Twitch", "Discord", "Clubhouse",
  "Medium", "Quora", "Vimeo", "Dailymotion", "Tumblr", "WeChat", "Telegram", "WhatsApp"
];

const Platforms = ({ selectedPlatforms, setSelectedPlatforms }) => {
  const togglePlatform = (platform) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(selectedPlatforms.filter((p) => p !== platform));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };

  return (
    <div className="platforms-container">
      {platformsList.map((platform) => (
        <div
          key={platform}
          className={`platform-item ${
            selectedPlatforms.includes(platform) ? "selected" : ""
          }`}
          onClick={() => togglePlatform(platform)}
        >
          {platform}
        </div>
      ))}
    </div>
  );
};

export default Platforms;
