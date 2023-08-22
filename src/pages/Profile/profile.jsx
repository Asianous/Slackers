import React, { useState, useEffect } from 'react';

const ACTIVITY_TIMEOUT = 15 * 60 * 1000; // 15 minutes in milliseconds

function UserProfile() {
  const [lastInteraction, setLastInteraction] = useState(Date.now());
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Date.now();
      const timeDifference = currentTime - lastInteraction;
      setIsActive(timeDifference < ACTIVITY_TIMEOUT);
    }, 60000); // Update every minute

    return () => {
      clearInterval(interval);
    };
  }, [lastInteraction]);

  const handleInteraction = () => {
    setLastInteraction(Date.now());
    // Send a request to the server to update the "last active" timestamp
    // This step needs to be implemented on the server side.
  };

  return (
    <div className="user-profile">
      <div className="profile-picture">
        {/* Your profile picture rendering logic */}
        {isActive && <div className="active-indicator" />}
      </div>
      <div className="username">Username</div>
      <button onClick={handleInteraction}>Interact with App</button>
    </div>
  );
}

export default UserProfile;
