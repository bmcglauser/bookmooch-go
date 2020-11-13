import { Link } from 'react-router-dom';
import './BookshelfItem.scss'
const moment = require('moment');


export default function BookshelfItem ( {listing} ) {
  const date = new Date(parseInt(listing.listed_on.padEnd(13, '0')));
  const addedStr = moment(date).format('MMM Do YYYY');
  const book = listing.book;

  const bookCover = listing.book.cover_art_url 
  ? <img className="cover-art" src={listing.book.cover_art_url} alt={`book cover`} />
  : <div className="cover-art not-found">
      <p>
        no<br />cover<br />art<br />found
      </p>
    </div>

  const bookTitle = book.title.length > 24 ? book.title.slice(0, 25)+'...' : book.title;

  return (
    <div className="bookshelf-item-grand-wrapper">
      <Link to={`/details/${book.asin}`} style={{textDecoration:'none'}}>
        {bookCover}
        <div className="center-text">
          <h3 className="title">{bookTitle}</h3>
          <h4 className="author">by {book.author}</h4>
          <h4 className="listed-on">added on {addedStr}</h4>
        </div>
      </Link>
      <div className="remove-button-block">
        <button className="remove-button">
          <div className="remove-icon" />
        </button>
        <p>remove</p>
      </div>
    </div>
  );
};
