export default function AutoCreatePanel({ userSettings, setUserSettings }) {
  return (
    <div className="auto-create-panel">
      <label>
        <input
          type="checkbox"
          checked={userSettings.useAvatar}
          onChange={(e) =>
            setUserSettings({ ...userSettings, useAvatar: e.target.checked })
          }
        />
        Enable AI Avatar
      </label>

      <label>
        <input
          type="checkbox"
          checked={userSettings.autoPost}
          onChange={(e) =>
            setUserSettings({ ...userSettings, autoPost: e.target.checked })
          }
        />
        Auto Post to All Platforms
      </label>

      <p>Videos will auto-generate daily at the optimal posting time.</p>
    </div>
  );
}
