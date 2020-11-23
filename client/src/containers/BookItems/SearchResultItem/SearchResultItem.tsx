import React from 'react';
import './SearchResultItem.scss';
import { Link } from 'react-router-dom';
import RandomColorCover from '../../../components/RandomColorCover';
import { Book } from '../../../services/queryService/queryServiceInterfaces';

type SearchResultItemProps = {
  book: Book
}

export default function SearchResultItem ({ book }: SearchResultItemProps): JSX.Element {
  const numberAvail = book && book.usernamesWith ? book.usernamesWith.length : 0;
  const availStr = numberAvail === 1
    ? `${numberAvail} copy available`
    : `${numberAvail} copies available`;

  const bookCover = book && book.cover_art_url
  ? <img className="cover-art" src={book.cover_art_url} alt={`book cover`} />
  : <RandomColorCover />


  const bookTitle = book && book.title && book.title.length > 18 ? book.title.slice(0, 19)+'...' : book.title;
  // let bookAuthor = book.author && book.author.length > 18 ? book.author.slice(0, 19)+'...' : book.author;

  return(
    <Link to={`/details/${book.asin}`} style={{textDecoration:'none'}}>
      <div className="search-result-item-grand-wrapper">
        {bookCover}
        <div className="result-item-text">
          <h2>{bookTitle}</h2>
          <h3>{book.author}</h3>
          <p>{availStr}</p>
        </div>
      </div>
    </Link>
  );
}