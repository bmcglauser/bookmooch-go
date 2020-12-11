import React, { FunctionComponent } from 'react';
import './ProfileInfo.scss'
import { Link } from 'react-router-dom';
import { User } from '../../services/queryService/queryServiceInterfaces'

type ProfileIndoProps = {
  user: User
}

const ProfileInfo: FunctionComponent<ProfileIndoProps> = props => {
  const { user } = props;

  const nameArr = user.display_name.split('(')[0].split(' ');
  const initials = nameArr[1] ? nameArr[0][0]+nameArr[1][0] : nameArr[0][0];

  return (
    <div className="profileInfo">
      <div className="top-block">
        <div className='initial-block'>
          <p className='initials'>
            {initials}
          </p>
        </div>
        <div className="names">
          <h3>{user.display_name.split('(')[0]}</h3>
          <h3>{user.username}</h3>
        </div>
      </div>
      <div className="bottom-block">
        <div className="stats">
          <h5>Current points: {parseInt(user.points)/10}</h5>
          <h5>Books listed: {user.listingCount}</h5>
          <h5>Feedback score: {user.feedback_score}</h5>
        </div>
        <div className="bookshelf-button-block">
          <Link to={`/bookshelf/${user.username}`}>
            <button className="bookshelf-button">
              <div className="bookshelf-icon"/>
            </button>
          </Link>
          <p>Go to<br />Bookshelf</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo;