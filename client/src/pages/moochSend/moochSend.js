import React from 'react';
import './moochSend.scss';
import { useQuery } from '@apollo/client';
import RandomCenterLoader from '../../components/Loaders/RandomCenterLoader';
import ActiveItem from '../../containers/BookItems/ActiveItem';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ErrorPage from '../errorPage';
import formatDate from '../../services/dateProcessor';
import queryService from '../../services/queryService';


export default function MoochSendPage (props) {
  const id = props.match.params.user + '/' + props.match.params.number;
  const query = queryService.GET_CONF_PENDING_GIVE(id);

  const { loading, error, data } = useQuery(query);

  if (loading) {
    return <RandomCenterLoader />;
  }
  if (error) {
    return <ErrorPage message={error.message} ctx={props}/>
  }

  const mooch = data.getConfidentialPendingById;

  const dateReqStr = formatDate(mooch.created_on);
  
  let dateSentStr;
  if (mooch.sent_on) dateSentStr = formatDate(mooch.sent_on);
    else dateSentStr = "Not sent yet"
  
  let pointsStr = mooch.points_to_giver === '10' ? "1 point" : `${parseInt(mooch.points_from_receiver)/10} points`

  return (
    <>
    <Header title="You're sending" />;
    <div className="mooch-send-item-grand-wrapper">
      <div className="active-item-wrapper">
        <ActiveItem book={mooch.book}/>
      </div>
      <p>you're getting {pointsStr} to send this book</p>
      <div className="mooch-detail-text-wrapper">
        <h4>Sending to:</h4>
        <p>{mooch.receiver_address}</p>
        <h4>Date requested:</h4>
        <p>{dateReqStr}</p>
        <h4>Date sent:</h4>
        <p>{dateSentStr}</p>
      </div>
      <div className="buttons-wrapper">
        <div className="single-button-wrapper">
          <button className="big-button">
            <div className="accept" />
          </button>
          <p>accept</p>
        </div>
        <div className="single-button-wrapper reject-wrapper">
          <button className="small-button">
            <div className="reject" />
          </button>
          <p>reject</p>
        </div>
        <div className="single-button-wrapper">
          <button className="big-button">
            <div className="sent" />
          </button>
          <p>sent</p>
        </div>
      </div>
      <div className="mooch-send-item-footer-wrapper">
        <Footer leftBut="back" rightBut="userHome" ctx={props}/>
      </div>
    </div>
    </>
  );
}