import './moochReceive.scss';
import { gql, useQuery } from '@apollo/client';
import LoaderA from '../../components/Loaders/LoaderA';
import ActiveItem from '../../containers/BookItems/ActiveItem'
import Header from '../../components/Header';
import UserHomeButton from '../../components/Buttons/UserHomeButton';
import BackButton from '../../components/Buttons/BackButton';
const moment = require('moment');

export default function MoochReceivePage (props) {
  const id = props.match.params.user + '/' + props.match.params.number;
  const GET_PENDING_ITEM = gql`
  query {
    getConfidentialPendingById (pending_id: "${id}") {
      transaction_name
      asin
      book {
        title
        author
      }
      giverUsername
      points_to_giver
      points_from_receiver
      created_on
      sent_on
      condition
      status
    }
  }
  `;
  const { loading, error, data } = useQuery(GET_PENDING_ITEM);

  if (loading) {
    return <LoaderA />;
  }
  if (error) {
    return <p> Error! ${error.message} </p>
  }

  const mooch = data.getConfidentialPendingById;
  console.log(mooch);

  let dateReq, dateReqStr;
  let dateSent, dateSentStr;
  dateReq = new Date(parseInt(mooch.created_on.padEnd(13, '0')));
  dateReqStr = moment(dateReq).format('MMM Do YYYY');
  if (mooch.sent_on) {
    dateSent = new Date(parseInt(mooch.sent_on.padEnd(13, '0')));
    dateSentStr = moment(dateSent).format('MMM Do YYYY');
  } else {
    dateSentStr = "Not sent yet"
  }
  let pointsStr = mooch.points_from_receiver === '10' ? "1 point" : `${parseInt(mooch.points_from_receiver)/10} points`

  return (
    <>
    <Header title="You're requesting" />;
    <div className="mooch-receive-item-grand-wrapper">
      <div className="active-item-wrapper">
        <ActiveItem book={mooch.book}/>
      </div>
      <p>you're spending {pointsStr} to get this book</p>
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
};
