import React, { FunctionComponent, useContext } from 'react';
import './pending.scss';
import { useQuery } from '@apollo/client';
import { RouteComponentProps } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ErrorPage from '../errorPage';
import PendingItem from '../../containers/BookItems/PendingItem';
import RandomCenterLoader from '../../components/Loaders/RandomCenterLoader';
import queryService from '../../services/queryService';
import { User, Transaction } from '../../services/queryService/queryServiceInterfaces';
import UserContext from '../../utils/UserContext';


interface Data {
  getUserByUsername: User
}

const PendingPage: FunctionComponent<RouteComponentProps> = props => {
  const { username } = useContext(UserContext);

  const query = queryService.GET_ALL_PENDING(username);

  const { loading, error, data } = useQuery<Data>(query);

  if (loading) return <RandomCenterLoader />;
  if (error) return <ErrorPage message={error.message} ctx={props}/>;

  const toSendArr = data?.getUserByUsername.pending_give?.map(
    (transaction: Transaction) =>
      <PendingItem key={transaction.transaction_name} mooch={transaction} direction='to_send' />
  );
  const toReceiveArr = data?.getUserByUsername.pending_receive?.map(
    (transaction: Transaction) =>
      <PendingItem key={transaction.transaction_name} mooch={transaction} direction='to_receive' />
  );

  const toSend = toSendArr?.length ? toSendArr : <h3 className="none-found">No pending mooches to send</h3>;
  const toReceive = toReceiveArr?.length ? toReceiveArr : <h3 className="none-found">No pending mooches to receive</h3>;

  return (
    <>
    <Header title="Your pending mooches" />
    <div className="pending-page-grand-wrapper">
      <h2>Your books to send:</h2>
      <div className="pending-list to-send-list">
        {toSend}
      </div>
      <h2>Your books to receive:</h2>
      <div className="pending-list to-receive-list">
        {toReceive}
      </div>
      <div className="pending-page-footer">
        <Footer leftBut="back" centerBut="circleAdd" rightBut="userHome" ctx={props}/>
      </div>
    </div>
    </>
  );
}

export default PendingPage;