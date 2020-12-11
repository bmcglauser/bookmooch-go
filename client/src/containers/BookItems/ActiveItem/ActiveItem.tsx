import React from 'react';
import './ActiveItem.scss';
import RandomColorCover from '../../../components/RandomColorCover';
import { Book } from '../../../services/queryService/queryServiceInterfaces';

type ActiveItemProps = {
  book: Book
}

export default function ActiveItem ({ book }: ActiveItemProps): JSX.Element {

  const bookCover = book && book.cover_art_url
    ? <img className="cover-art" src={book.cover_art_url} alt={`book cover`} />
    : <RandomColorCover />

  const bookTitle = book.title && book.title.length > 24 ? book.title.slice(0, 25)+'...' : book.title;

  return (
    <div className="active-item-grand-wrapper">
      {bookCover}
      <div className="active-item-text">
        <h3 className="title">{bookTitle}</h3>
        <h4 className="author">by {book.author}</h4>
      </div>
    </div>
  );
}