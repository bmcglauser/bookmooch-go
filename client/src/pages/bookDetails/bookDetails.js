import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import BackButton from '../../components/Buttons/BackButton';
import UserHomeButton from '../../components/Buttons/UserHomeButton';
import BookDetailsInfo from '../../containers/BookItems/BookDetailsInfo';
import './bookDetails.scss';
import { gql, useQuery } from '@apollo/client';
import RandomCenterLoader from '../../components/Loaders/RandomCenterLoader';

// const falseBook = {
//   title: "A Book Title",
//   author: "Person Authorson",
//   cover_art_url: "http://ecx.images-amazon.com/images/I/41PQH3vGUpL.jpg",
//   usernamesWith: ['userA247','anotherUserWV2009','BookLuvrr','catDad23'],
//   asin: "B00BW917Y",
//   summary: "This is a lengthy description of a book. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam erat turpis, ullamcorper at velit in, fringilla luctus massa. Pellentesque egestas massa blandit dolor ultricies blandit. Proin vestibulum eleifend blandit. Ut commodo commodo orci, sit amet tempus libero molestie at. Pellentesque rhoncus condimentum laoreet. Aliquam vel ligula nisi. Curabitur quis scelerisque lorem. Quisque non quam nec ipsum consectetur tincidunt a ac urna. Aenean iaculis, mauris quis elementum aliquet, nunc dui vestibulum mi, vitae venenatis urna leo at dui. Etiam pharetra tincidunt ligula, nec convallis nisl iaculis in. Quisque vehicula tellus neque, non pretium magna congue et. Aliquam erat volutpat. Nulla molestie."
// };


export default function BookDetailsPage (props) {
  const asin = props.match.params.asin
  const GET_BOOK = gql`
    query {
      getBookByAsin (asin: "${asin}") {
        asin
        title
        author
        cover_art_url
        availCount
        summary
        usernamesWith
      }
    }
  `;
  const { loading, error, data } = useQuery(GET_BOOK);

  if (loading) {
    return <RandomCenterLoader />;
  }
  if (error) {
    return <p> Error! ${error.message} </p>
  }
  return (
    <>
      <Header title="Book details"/>
      <div className="bookdetails-grand-wrapper">
        <BookDetailsInfo book={data.getBookByAsin}/>
        <div className="button-wrapper">
          <Link to={`/confirmadd/${asin}`} style={{textDecoration:'none'}}>
            <button className="add-wrapper wide-button">
              <div className="add-icon button-icon">
                <div className="horizontal-bar" />
                <div className="vertical-bar" />
              </div>
              <div className="button-text">Add this book <br /> to give away</div>
            </button>
          </Link>
          <Link to={`/choose/${asin}`} style={{textDecoration:'none'}}>
            <button className="request-wrapper wide-button">
              <div className="request-icon button-icon" />
              <div className="button-text">Request to <br /> mooch this book</div>
            </button>
          </Link>
        </div>
        <div className='detail-footer'>
          <div className='footer-button'>
            <BackButton ctx={props} />
          </div>
          <div className='footer-button'>
            <UserHomeButton />
          </div>
        </div>
      </div>
    </>
  );
}
