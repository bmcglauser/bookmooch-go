import React from 'react';
import './moochReceive.scss';
import { useQuery } from '@apollo/client';
import RandomCenterLoader from '../../components/Loaders/RandomCenterLoader';
import ActiveItem from '../../containers/BookItems/ActiveItem'
import Header from '../../components/Header';
import UserHomeButton from '../../components/Buttons/UserHomeButton';
import BackButton from '../../components/Buttons/BackButton';
import formatDate from '../../services/dateProcessor';
import queryService from '../../services/queryService/queryService';

export default function MoochReceivePage (props) {
  const id = props.match.params.user + '/' + props.match.params.number;
  const query = queryService.GET_CONF_PENDING_RECEIVE(id);

  const { loading, error, data } = useQuery(query);

  if (loading) {
    return <RandomCenterLoader />;
  }
  if (error) {
    return <p> Error! ${error.message} </p>
  }

  const mooch = data.getConfidentialPendingById;

  const dateReqStr = formatDate(mooch.created_on);
  
  let dateSentStr;
  if (mooch.sent_on) dateSentStr = formatDate(mooch.sent_on)
    else dateSentStr = "Not sent yet"
    
  let pointsStr = mooch.points_from_receiver === '10' ? "1 point" : `${parseInt(mooch.points_from_receiver)/10} points`

  return (
    <>
    <Header title="You're requesting" />;
    <div className="mooch-receive-item-grand-wrapper">
      <div className="active-item-wrapper">
        <ActiveItem book={mooch.book}/>
      </div>
      <p>you{`&#39`}re spending {pointsStr} to get this book</p>
      <div className="mooch-detail-text-wrapper">
        <h4>Mooching from:</h4>
        <p>{mooch.giverUsername}</p>
        <h4>Date requested:</h4>
        <p>{dateReqStr}</p>
        <h4>Date sent:</h4>
        <p>{dateSentStr}</p>
      </div>
      <div className="buttons-wrapper">
        <div className="received-button-wrapper">
          <button className="big-button">
            <div className="received" />
          </button>
          <p>mark received</p>
        </div>
      </div>
      <div className="mooch-receive-item-footer">
        <BackButton ctx={props}/>
        <UserHomeButton />
      </div>
    </div>
    </>
  );
}