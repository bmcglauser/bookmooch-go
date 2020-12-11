import React, { FunctionComponent } from 'react';
import './UserHomeButton.scss';
import { Link } from 'react-router-dom';

const UserHomeButton: FunctionComponent = () => 
  <Link to="/profile" style={{textDecoration:'none'}}>
    <div className="user-button-wrapper">
      <button className="user-button" />
      <p>User Home</p>
    </div>
  </Link>

export default UserHomeButton;