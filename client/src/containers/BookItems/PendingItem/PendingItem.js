import './PendingItem.scss';
import { Link } from 'react-router-dom';
const moment = require('moment');

export default function PendingItem ({mooch, direction}) {
  const book = mooch.book;
  const date = new Date(parseInt(mooch.created_on.padEnd(13, '0')));
  const addedStr = moment(date).format('MMM Do YYYY');

  const bookCover = book.cover_art_url 
  ? <img className="cover-art" src={book.cover_art_url} alt={`book cover`} />
  : <div className="cover-art not-found">
      <p>
        no<br />cover<br />art<br />found
      </p>
    </div>

  const bookTitle = book.title.length > 20 ? book.title.slice(0, 21)+'...' : book.title;

  if (direction === 'to_send') {
    return (
      <Link to={`/sending/${mooch.transaction_name}`} style={{textDecoration:'none'}}>
        <div className="pending-item-grand-wrapper">
          {bookCover}
          <div className="pending-text">
            <h3>{bookTitle}</h3>
            <h4>send to {mooch.receiverUsername}</h4>
            <p>requested on {addedStr}</p>
          </div>
        </div>
      </Link>
    );
  } else {
    return (
      <Link to={`/receiving/${mooch.transaction_name}`} style={{textDecoration:'none'}}>
        <div className="pending-item-grand-wrapper">
          {bookCover}
          <div className="pending-text">
            <h3>{bookTitle}</h3>
            <h4>get from {mooch.giverUsername}</h4>
            <p>requested on {addedStr}</p>
          </div>
        </div>
      </Link> 
    );
  } 
};
