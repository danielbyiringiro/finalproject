import React, { useState, useEffect } from 'react';
import './Alert.css'

export default () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show the alert when the component mounts
    setVisible(true);

    // Hide the alert after 5 seconds
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);

    // Cleanup the timer
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {visible && (
        <div className="alert">
          Use the authentication code sent to your email
        </div>
      )}
    </div>
  );
};

