import './confirmAdd.scss'
import { gql, useQuery } from '@apollo/client';
import LoaderA from '../../components/Loaders/LoaderA';
import Header from '../../components/Header';
import ActiveItem from '../../containers/BookItems/ActiveItem';


export default function ConfirmAddPage (props) {
  const asin = props.match.params.asin;
  const GET_BOOK = gql`
  query {
    getBookByAsin (asin: "${asin}") {
      asin
      title
      author
      cover_art_url
    }
  }
  `;
  const { loading, error, data } = useQuery(GET_BOOK);

  if (loading) {
    return <LoaderA />;
  }
  if (error) {
    return <p> Error! ${error.message} </p>
  }

  return (
    <>
    <Header title="Confirm your add" />
    <div className="confirm-add-page-grand-wrapper">
      <div className="top-block">
        <p className="top-text">You're adding the following<br />to your bookshelf, to give away:</p>
        <ActiveItem book={data.getBookByAsin} />
      </div>
      <p className="condition-prompt-text">You can also add notes on the condition of your copy, if you'd like</p>
      <form className="confirm-add-form">
        <textarea placeholder="Cover scuffed, light markings inside..."/>
        <div className='button-wrapper'>
          <button className="confirm button">
            <div className="confirm-icon" />
            <p>Confirm add</p>
          </button>
        </div>
      </form>
      <div onClick={()=>props.history.goBack()} className='button-wrapper'>
        <button className="back button">
          <div className="back-icon" />
          <p>Go back</p>
        </button>
      </div>
      <div className="confirm-add-footer">
        <p>You'll get 1/10th of a point just for adding this book!</p>
      </div>
    </div>
    </>
  );
};
