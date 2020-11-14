import React from 'react';
import { Link } from 'react-router-dom';
import './BookshelfItem.scss'
import RandomColorCover from '../../../components/RandomColorCover';
import formatDate from '../../../services/dateProcessor';

export default function BookshelfItem ( {listing} ) {

  const addedStr = formatDate(listing.listed_on)
  const book = listing.book;

  const bookCover = listing.book.cover_art_url 
  ? <img className="cover-art" src={listing.book.cover_art_url} alt={`book cover`} />
  : <RandomColorCover />

  const bookTitle = book.title.length > 24 ? book.title.slice(0, 25)+'...' : book.title;

  return (
    <div className="bookshelf-item-grand-wrapper">
      <Link to={`/details/${listing.asin}`} style={{textDecoration:'none'}}>
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
}