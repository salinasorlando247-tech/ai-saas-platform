export default function VideoOptionsPanel({ videoSettings, setVideoSettings }) {
  return (
    <div className="video-options">
      <label>
        <input
          type="checkbox"
          checked={videoSettings.useAvatar}
          onChange={(e) =>
            setVideoSettings({ ...videoSettings, useAvatar: e.target.checked })
          }
        />
        Use AI Avatar
      </label>
      {/* Other options like auto-post, AI polish, etc. */}
    </div>
  );
}
