import React, { useState, useEffect } from 'react';

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('forgeai_cookie');
    if (!accepted) setVisible(true);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('forgeai_cookie', 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-gray-900 text-white p-4 rounded shadow flex justify-between items-center z-50">
      <p>This website uses cookies to enhance your experience. By continuing, you accept our Privacy Policy.</p>
      <button onClick={acceptCookies} className="bg-blue-600 px-4 py-2 rounded ml-4">Accept</button>
    </div>
  );
};

export default CookieConsent;
