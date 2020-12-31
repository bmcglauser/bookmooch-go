import React, { FunctionComponent, useContext } from 'react';
import './chooseMooch.scss';
import Header from '../../components/Header';
import ActiveItem from '../../containers/BookItems/ActiveItem';
import Footer from '../../components/Footer';
import ErrorPage from '../errorPage';
import UserWithItem from '../../containers/UserWithItem';
import { useQuery } from '@apollo/client';
import RandomCenterLoader from '../../components/Loaders/RandomCenterLoader';
import queryService from '../../services/queryService';
import { Book, User } from '../../services/queryService/queryServiceInterfaces'
import { RouteComponentProps } from 'react-router-dom'
import UserContext from '../../utils/UserContext';


interface Data  {
  getBookByAsin: Book;
  getUserByUsername: User;
}

type TParams = { asin: string }

const ChooseMoochPage: FunctionComponent<RouteComponentProps<TParams>> = props => {
  const asin = props.match.params.asin
  const selfUsername = useContext(UserContext).username;
  const query = queryService.GET_MOOCH_CHOICE(asin, selfUsername);
  
  const { loading, error, data } = useQuery<Data>(query);

  if (loading) return <RandomCenterLoader />;
  if (error) return <ErrorPage message={error.message} ctx={props}/>;
  
  const book = data?.getBookByAsin;
  const self = data?.getUserByUsername;

  const usersArr = self && book?.usersWith?.map( user => 
    <UserWithItem key={user.username} self={self} other={user} asin={asin}/>
  )

  const users = usersArr?.length
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
        { book && <ActiveItem book={book} /> }
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

export default ChooseMoochPage;
