import './feedback.scss';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import { gql, useQuery } from '@apollo/client';
import LoaderA from '../../components/Loaders/LoaderA';
import ActiveItem from '../../containers/BookItems/ActiveItem';

export default function FeedbackPage (props) {
  const id = props.match.params.user + '/' + props.match.params.number;
  const GET_TRANSACTION = gql`
    query {
      getPendingById (pending_id: "${id}") {
        transaction_name
        asin
        book {
          title
          author
          cover_art_url
        }
        giverUsername      
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_TRANSACTION);

  if (loading) {
    return <LoaderA />;
  }
  if (error) {
    return <p> Error! ${error.message} </p>
  }

  const mooch = data.getPendingById;
  const book = mooch.book;

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
              <input type="radio" id="bad" name="rating" value="-1" />
              <label htmlFor="bad">Bad</label>
            </div>
            <div className="radio-item">
              <input type="radio" id="fine" name="rating" value="0" />
              <label htmlFor="fine">Fine</label>
            </div>
            <div className="radio-item">
              <input type="radio" id="great" name="rating" value="1" />
              <label htmlFor="great">Great!</label>
            </div>
            {/* <input type="radio" id="bad" name="rating" value="-1" />
            <label htmlFor="bad">Bad</label><br />
            <input type="radio" id="fine" name="rating" value="0" />
            <label htmlFor="fine">Fine</label><br />
            <input type="radio" id="great" name="rating" value="1" />
            <label htmlFor="great">Great!</label> */}
          </div>
        </div>
        <div className="bottom-form-block">
          <p>Anything else to add?</p>
          <textarea className="form-comments"/>
          <button className="submit-feedback" type="submit">
            <p>Thanks for<br />your feedback!</p>
          </button>
        </div>
      </form>
      <div className="feedback-page-footer">
        <p>Misclick? Go back to your <Link to="/pending">Pending Mooches</Link></p>
      </div>
    </div>
    </>
  );
};

