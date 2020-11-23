import React from 'react';
import './moochSend.scss';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import RandomCenterLoader from '../../components/Loaders/RandomCenterLoader';
import ActiveItem from '../../containers/BookItems/ActiveItem';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ErrorPage from '../errorPage';
import formatDate from '../../services/dateProcessor';
import queryService from '../../services/queryService';
import { RouteComponentProps } from 'react-router-dom'
import { Transaction } from '../../services/queryService/queryServiceInterfaces'

type TParams = {
  user: string,
  number: string
 }

 interface Data {
  getConfidentialPendingById: Transaction
 }

export default function MoochSendPage (props: RouteComponentProps<TParams>) : JSX.Element {
  const id = props.match.params.user + '/' + props.match.params.number;
  const query = queryService.GET_CONF_PENDING_GIVE(id);

  const { loading, error, data } = useQuery<Data>(query);

  if (loading) {
    return <RandomCenterLoader />;
  }
  if (error) {
    return <ErrorPage message={error.message} ctx={props}/>
  }

  const mooch = data?.getConfidentialPendingById;

  const dateReqStr = mooch?.created_on ?  formatDate(mooch.created_on): '';

  let dateSentStr;
  if (mooch?.sent_on) dateSentStr = formatDate(mooch.sent_on);
    else dateSentStr = "Not sent yet"

  let pointsStr = '';
  if (mooch) {
    if (mooch.points_to_giver === '10') {
      pointsStr = '1 point';
    } else if (mooch.points_from_receiver) {
      pointsStr = `${parseInt(mooch.points_from_receiver)/10} points`;
    }
  }
  const pendingIDtopass = id.split('/').join('+');

  return (
    <>
    <Header title="You're sending" />;
    <div className="mooch-send-item-grand-wrapper">
      <div className="active-item-wrapper">
       {mooch &&  <ActiveItem book={mooch?.book}/>}
      </div>
      <p>you're getting {pointsStr} to send this book</p>
      <div className="mooch-detail-text-wrapper">
        <h4>Sending to:</h4>
        <p>{mooch?.receiver_address}</p>
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
          <Link to={`/controller/reject/${pendingIDtopass}`} style={{textDecoration:"none"}}>
            <button className="small-button">
              <div className="reject" />
            </button>
          </Link>
          <p>reject</p>
        </div>
        <div className="single-button-wrapper">
          <Link to={`/controller/sent/${pendingIDtopass}`} style={{textDecoration:"none"}} >
            <button className="big-button">
              <div className="sent" />
            </button>
          </Link>
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