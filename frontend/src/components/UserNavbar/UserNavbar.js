import React, { useState, useRef } from 'react';
import './UserNavbar.css';

function UserNavbar({ activeUser, selectUser, availableProfiles }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const timerRef = useRef(null);

  const displayName = activeUser?.id ? activeUser.name : 'Login';
  const profiles = availableProfiles || {};

  const handleSelect = (id) => {
    selectUser(id);
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsMenuOpen(false);
  };

  const handleMouseEnter = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsMenuOpen(true);
  };

  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => {
      setIsMenuOpen(false);
    }, 300);
  };

  return (
    <div
      className="user-menu-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className="welcome-text">
           {activeUser?.id && 'Bem-vindo, '} 
           <strong>{displayName}</strong>
           <span className="dropdown-arrow">{isMenuOpen ? ' ▲' : ' ▼'}</span>
      </span>

      {isMenuOpen && (
        <div className="dropdown-menu">
          {Object.values(profiles).map((profile) => (
            <button
              key={profile.id}
              onClick={() => handleSelect(profile.id)}
              className={`dropdown-item ${activeUser?.id === profile.id ? 'active' : ''}`}
            >
              {profile.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserNavbar;
