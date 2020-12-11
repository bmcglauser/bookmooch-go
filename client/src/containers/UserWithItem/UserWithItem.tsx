import React from 'react';
import './UserWithItem.scss'
import { Link } from 'react-router-dom';
import formatDate from '../../services/dateProcessor';
import { User } from '../../services/queryService/queryServiceInterfaces';

type UserWithItemProps = {
  self: User,
  other: User,
  asin: string
}

export default function UserWithItem ({ self, other, asin }: UserWithItemProps): JSX.Element {

  let willSendP;
  let requestable;
  switch (other.willsend) {
    case 'anywhere':
      willSendP = <p className="will-send">will send<br />to your country</p>;
      requestable = true;
      break;
    case 'askme':
      willSendP = 'ask me first';
      requestable = true;
      break;
    case 'mycountry':
      if (self.country === other.country) {
        willSendP = <p className="will-send">will send<br />to your country</p>;
        requestable = true;
    } else {
        willSendP = <p className="will-send">will not send<br />to your country</p>;
        requestable = false;
    }
      break;
    default:
      willSendP = <p className="will-send">will not send<br />to your country</p>;
      requestable = false;
  }
  const condition = other?.listings ? other.listings[0].condition : '';

  const addedDateStr = other?.listings ? formatDate(other.listings[0].listed_on): '';

  const idArr = other.display_name.split(' (');
  const name = idArr[0];
  const country = '(' + idArr[1];


  if (requestable) {
    return (
      <div className="user-with-item-grand-wrapper">
        <div className="top-text-block">
          <div className="id-block">
            <p className="other-user-name">{name}</p>
            <p className="other-user-country">{country}</p>
          </div>
          {willSendP}
        </div>
        <div className="bottom-block">
          <div className="bottom-block-text">
            <p><i>added on {addedDateStr}</i></p>
            <p>Feedback score: {other.feedback_score}</p>
            <p>Condition: "{condition} "</p>
          </div>
          <div className="request-button-wrapper">
            <Link to={`/confirmmooch/${other.username}/${asin}`} style={{textDecoration: 'none'}}>
              <button className="request-button">
                <div className="request-button-icon" />
              </button>
            </Link>
            <p>request from<br />this user</p>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="user-with-item-grand-wrapper">
        <div className="top-text-block">
          <div className="id-block">
            <p className="other-user-name">{name}</p>
            <p className="other-user-country">{country}</p>
          </div>
          {willSendP}
        </div>
        <div className="bottom-block">
          <div className="bottom-block-text">
            <p><i>added on {addedDateStr}</i></p>
            <p>Feedback score: {other.feedback_score}</p>
            <p>Condition: "{condition} "</p>
          </div>
        </div>
      </div>
    );
  }
}
