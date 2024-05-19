import React from 'react';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">PerceptoFeed</div>
      <ul className="navbar-nav">
        <li className="nav-item"><a href="/">Home</a></li>
        <li className="nav-item"><a href="/help">Help</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
