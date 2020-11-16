import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import './bookDetails.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import RandomCenterLoader from '../../components/Loaders/RandomCenterLoader';
import ErrorPage from '../errorPage';
import BookDetailsInfo from '../../containers/BookItems/BookDetailsInfo';
import queryService from '../../services/queryService';


export default function BookDetailsPage (props) {
  const asin = props.match.params.asin
  const query = queryService.GET_BOOK_DETAILS(asin);

  const { loading, error, data } = useQuery(query);

  if (loading) {
    return <RandomCenterLoader />;
  }
  if (error) {
    return <ErrorPage message={error.message} ctx={props}/>
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
        <div className='detail-footer-wrapper'>
          <Footer leftBut="back" rightBut="search" ctx={props}/>
        </div>
      </div>
    </>
  );
}
