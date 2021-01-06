import React, { FunctionComponent } from 'react';
import './BookDetailsInfo.scss';
import RandomColorCover from '../../../components/RandomColorCover';
import { Book } from '../../../services/queryService/queryServiceInterfaces';

type BookDetailsInfoProps = {
  book: Book;
};

const BookDetailsInfo: FunctionComponent<BookDetailsInfoProps> = (props) => {
  const { book } = props;

  const bookCover = book.cover_art_url ? (
    <img className="cover-art" src={book.cover_art_url} alt={`book cover`} />
  ) : (
    <RandomColorCover />
  );

  const summary =
    book.summary && book.summary.length ? (
      <p className="summary-text">{book.summary}</p>
    ) : (
      <p className="summary-text">
        No summary found for this book, but it's likely perfectly good!
      </p>
    );

  let availabilityText;
  if (book.usernamesWith) {
    if (book.usernamesWith.length === 1) {
      availabilityText = '1 copy is available for mooching';
    } else {
      availabilityText = `Copies available from ${book.usernamesWith.length} users`;
    }
  } else {
    availabilityText = 'No copies currently available for mooching';
  }

  return (
    <div className="details-info-grand-wrapper">
      <div className="details-info-top-block">
        {bookCover}
        <div className="top-block-text">
          <h2>{book.title}</h2>
          <h2>by {book.author}</h2>
        </div>
      </div>
      <div className="extra-info">
        <p className="extra-info-text">{availabilityText}</p>
        {summary}
      </div>
    </div>
  );
};

export default BookDetailsInfo;
