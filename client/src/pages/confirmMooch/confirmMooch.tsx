import React, { FunctionComponent, useState, useContext } from 'react';
import './confirmMooch.scss';
import { useQuery } from '@apollo/client';
import { Link, RouteComponentProps } from 'react-router-dom';
import Header from '../../components/Header';
import ErrorPage from '../errorPage';
import RandomCenterLoader from '../../components/Loaders/RandomCenterLoader';
import ActiveItem from '../../containers/BookItems/ActiveItem';
import formatDate from '../../services/dateProcessor';
import queryService from '../../services/queryService';
import { User, Book } from '../../services/queryService/queryServiceInterfaces';
import UserContext from '../../utils/UserContext';

type TParams = {
  user: string,
  asin: string
}

interface Data {
  self: User;
  otherUser: User;
  getBookByAsin: Book;
}

const ConfirmMoochPage: FunctionComponent<RouteComponentProps<TParams>> = props => {
  const username = props.match.params.user;
  const asin = props.match.params.asin;
  const selfUsername = useContext(UserContext).username;

  const query = queryService.GET_CONFIRM_MOOCH(username, asin, selfUsername);

  const { loading, error, data } = useQuery<Data>(query);
  const [address, setAddress] = useState('');

  if (loading) return <RandomCenterLoader />;
  if (error) return <ErrorPage message={error.message} ctx={props}/>;
  const user = data?.otherUser;
  const self = data?.self;
  const book = data?.getBookByAsin;

  const condition = user?.listings ? user.listings[0].condition : '';
  const addedDateStr = user?.listings ? formatDate(user.listings[0].listed_on) : '';

  const pointCost = self?.country === user?.country ? 1 : 3;
  const pointsLeft = self && parseInt(self.points) / 10 - pointCost;
  const pointsLeftStr = pointsLeft === 1 ? '1 point' : `${pointsLeft} points`;

  let directMoochBool = false;
  switch (user?.willsend) {
    case 'anywhere':
      directMoochBool = true;
      break;
    case 'askme':
      directMoochBool = false;
      break;
    case 'mycountry':
      if (self?.country === user?.country) {
        directMoochBool = true;
      }
      break;
    default:
      directMoochBool = false;
  }

  const topText = directMoochBool ? "You're about to mooch this the following book:" : "You're requesting to mooch the following book:"
  const confirmText = directMoochBool ? "Mooch now" : "Confirm request"

  return (
    <>
    <Header title="Confirm your mooch" />
    <div className="confirm-mooch-page-grand-wrapper">
      <div className="top-block">
        <p className="top-text">{topText}</p>
        {book && <ActiveItem book={book} />}
      </div>
      <div className="mooch-copy-text">
        <p>from {user?.display_name}</p>
        <p>Username: {user?.username}</p>
        <p>Listed on: {addedDateStr}</p>
        <p>Condition notes: {condition}</p>
      </div>
      <div className="address-entry">
        <p>Where should the book be sent?</p>
        <textarea onChange={e=>setAddress(e.target.value)} value={address} />
      </div>
      <div className='button-wrapper confirm-wrapper'>
        <Link to={`/controller/mooch/${asin}/x/x/x/${username}/${address}`} style={{textDecoration:'none'}}>
          <button className="confirm button">
            <div className="confirm-icon" />
            <p>{confirmText}</p>
          </button>
        </Link>
      </div>
      <div onClick={()=>props.history.goBack()} className='button-wrapper'>
        <button className="back button">
          <div className="back-icon" />
          <p>Go back</p>
        </button>
      </div>
      <div className="confirm-mooch-footer">
        <p>You'll have {pointsLeftStr} left after mooching this book</p>
      </div>
    </div>
    </>
  );
}

export default ConfirmMoochPage;