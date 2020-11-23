import React from 'react';
import './UserHomeButton.scss';
import { Link } from 'react-router-dom';

export default function UserHomeButton () : JSX.Element {
  return (
    <Link to="/profile" style={{textDecoration:'none'}}>
      <div className="user-button-wrapper">
        <button className="user-button" />
        <p>User Home</p>
      </div>
    </Link>
  );
}