import React from 'react';
import './chooseMooch.scss';
import Header from '../../components/Header';
import ActiveItem from '../../containers/BookItems/ActiveItem';
import Footer from '../../components/Footer';
import ErrorPage from '../errorPage';
import UserWithItem from '../../containers/UserWithItem';
import { useQuery } from '@apollo/client';
import RandomCenterLoader from '../../components/Loaders/RandomCenterLoader';
import queryService from '../../services/queryService';

const falseSelf = {
  username: 'spectrome',
  display_name: 'Brett G',
  country: 'US',
  points: '12'
};

export default function ChooseMoochPage (props) {
  const asin = props.match.params.asin
  const query = queryService.GET_MOOCH_CHOICE(asin);
  
  const { loading, error, data } = useQuery(query);

  if (loading) {
    return <RandomCenterLoader />;
  }
  if (error) {
    return <ErrorPage message={error.message} ctx={props}/>
  }
  
  const book = data.getBookByAsin;
  
  const usersArr = book.usersWith.map( user => 
    <UserWithItem key={user.username} self={falseSelf} other={user} asin={asin}/>
  )

  const users = usersArr.length
    ? usersArr
    : <div className="none-found">
        <p>No users found with this book listed</p>
      </div>
    ;

  return (
    <>
    <Header title="Get this book!" />
    <div className="choose-mooch-page-grand-wrapper">
      <div className="active-item-wrapper">
        <ActiveItem book={book} />
      </div>
      <div className="users-with-wrapper">
        {users}
        <div className="extra-space" />
      </div>
      <div className="choose-mooch-footer-wrapper">
        <Footer leftBut="back" rightBut="userHome" ctx={props}/>
      </div>
    </div>
    </>
  );
}