import React, { FunctionComponent, useContext } from 'react';
import './UserHomeButton.scss';
import { Link } from 'react-router-dom';
import UserContext from '../../../utils/UserContext';

const UserHomeButton: FunctionComponent = () => {
  const { username } = useContext(UserContext);

  return (
    <Link to={`/profile/${username}`} style={{textDecoration:'none'}}>
      <div className="user-button-wrapper">
        <button className="user-button" />
        <p>User Home</p>
      </div>
    </Link>
  );}

export default UserHomeButton;