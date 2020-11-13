import './ActiveItem.scss';

export default function ActiveItem ({book}) {

  const bookCover = book.cover_art_url 
    ? <img className="cover-art" src={book.cover_art_url} alt={`book cover`} />
    : <div className="cover-art not-found">
        <p>
          no<br />cover<br />art<br />found
        </p>
      </div>

  return (
    <div className="active-item-grand-wrapper">
      {bookCover}
      <div className="active-item-text">
        <h3 className="title">{book.title}</h3>
        <h4 className="author">by {book.author}</h4>
      </div>
    </div>
  );
};
