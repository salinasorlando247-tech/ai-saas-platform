export default function FacelessUnlockModal({ onUnlock }) {
  return (
    <div className="modal">
      <h2>Unlock Faceless AI Videos</h2>

      <p>
        Create faceless AI videos with voice, motion, templates, thumbnails,
        and scheduling.
      </p>

      <ul>
        <li>✔ Up to 120 export minutes / month</li>
        <li>✔ 720p quality</li>
        <li>✔ Human-sounding AI voices</li>
        <li>✔ Schedule anytime</li>
        <li>✔ Cancel anytime</li>
      </ul>

      <h3>$5 / month</h3>

      <button onClick={onUnlock}>
        Unlock Faceless Videos
      </button>

      <p className="note">
        Faceless videos are included free in Starter and above.
      </p>
    </div>
  );
}
