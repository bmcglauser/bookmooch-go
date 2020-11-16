import React, { useState } from 'react';
import './feedback.scss';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import ErrorPage from '../errorPage';
import { useQuery } from '@apollo/client';
import RandomCenterLoader from '../../components/Loaders/RandomCenterLoader';
import ActiveItem from '../../containers/BookItems/ActiveItem';
import queryService from '../../services/queryService';

export default function FeedbackPage (props) {
  const id = props.match.params.user + '/' + props.match.params.number;
  const query = queryService.GET_TRANSACTION(id);

  const { loading, error, data } = useQuery(query);
  const [score, setScore] = useState('0');

  if (loading) {
    return <RandomCenterLoader />;
  }
  if (error) {
    return <ErrorPage message={error.message} ctx={props}/>
  }

  const mooch = data.getPendingById;
  const book = mooch.book;

  const pendingIDtoPass = id.split('/').join('+');

  return (
    <>
    <Header title="Give feedback!" />
    <div className="feedback-page-grand-wrapper">
      <p className="top-text">You've marked the following<br />book as received:</p>
      <div className="active-item-wrapper">
        <ActiveItem book={book} />
      </div>
      <form className="feedback-form">
        <div className="top-form-block">
          <p className="form-text">How was your<br />experience mooching<br />from {mooch.giverUsername}?</p>
          <div className="radio-block">
            <div className="radio-item">
              <input onChange={e=>setScore(e.target.value)} type="radio" id="bad" name="rating" value="-1" />
              <label htmlFor="bad">Bad</label>
            </div>
            <div className="radio-item">
              <input onChange={e=>setScore(e.target.value)} type="radio" id="fine" name="rating" value="0" />
              <label htmlFor="fine">Fine</label>
            </div>
            <div className="radio-item">
              <input onChange={e=>setScore(e.target.value)} type="radio" id="great" name="rating" value="1" />
              <label htmlFor="great">Great!</label>
            </div>
          </div>
        </div>
        <div className="bottom-form-block">
          <p>Anything else to add?</p>
          <textarea className="form-comments"/>
          <Link to={`/controller/received/${pendingIDtoPass}/x/x/${score}`} style={{textDecoration:"none"}}>
            <button className="submit-feedback" type="submit">
              <p>Thanks for<br />your feedback!</p>
            </button>
          </Link>
        </div>
      </form>
      <div className="feedback-page-footer">
        <p>Misclick? Go back to your <Link to="/pending">Pending Mooches</Link></p>
      </div>
    </div>
    </>
  );
}