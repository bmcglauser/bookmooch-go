import { gql, useQuery } from '@apollo/client';
import Header from '../../components/Header';
import BackButton from '../../components/Buttons/BackButton'
import CircleAddButton from '../../components/Buttons/CircleAddButton'
import SearchButton from '../../components/Buttons/SearchButton'
import PendingItem from '../../containers/BookItems/PendingItem';
import RandomCenterLoader from '../../components/Loaders/RandomCenterLoader';
import './pending.scss';


export default function PendingPage (props) {
  const username = props.match.params.username;
  const GET_PENDING = gql`
    query {
      getUserByUsername (username: "${username}") {
        username
        pending_give {
          transaction_name
          asin
          book {
            title
            author
          }
          status
          receiverUsername
          created_on
        }
        pending_receive {
          transaction_name
          asin
          book {
            title
            author
          }
          status
          giverUsername
          created_on
        }
      }
    }
  `;
  const { loading, error, data } = useQuery(GET_PENDING);

  if (loading) {
    return <RandomCenterLoader />;
  }
  if (error) {
    return <p> Error! ${error.message} </p>
  }

  const toSendArr = data.getUserByUsername.pending_give
    .map(transaction => <PendingItem key={transaction.transaction_name} mooch={transaction} direction='to_send' />);
  
  const toReceiveArr = data.getUserByUsername.pending_receive
    .map(transaction => <PendingItem key={transaction.transaction_name} mooch={transaction} direction='to_receive' />);

  // const toSend = props.pending_give || <h1 className="none-found">No mooches found for this user</h1>;
  // const toReceive = props.pending_receive || <h1 className="none-found">No mooches found for this user</h1>;
  
  return (
    <>
    <Header title="Your pending mooches" />
    <div className="pending-page-grand-wrapper">
      <h2>Your books to send:</h2>
      <div className="pending-list to-send-list">
        {toSendArr}
      </div>
      <h2>Your books to receive:</h2>
      <div className="pending-list to-receive-list">
        {toReceiveArr}
      </div>
      <div className="pending-page-footer">
        <BackButton ctx={props} />
        <CircleAddButton />
        <SearchButton />
      </div>
    </div>
    </>
  );
};
