import React from 'react';

import './Header.css';

const Header = () => {
  return (
    <header className="Header">
      <img className="Logo" src="/static/assets/netflix_logo.svg" alt="Netflix Logo" />
      <h3 className="Title">Open Source Explorer</h3>
    </header>
  );
}

export default Header;