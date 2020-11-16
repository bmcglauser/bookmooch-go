import React from 'react';
import { useQuery } from '@apollo/client';
import './bookshelf.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ErrorPage from '../errorPage';
import BookshelfItem from '../../containers/BookItems/BookshelfItem';
import RandomCenterLoader from '../../components/Loaders/RandomCenterLoader';
import queryService from '../../services/queryService';


export default function BookshelfPage (props) {
  const username = props.match.params.username ? props.match.params.username : 'spectrome';
  const query = queryService.GET_BOOKSHELF(username);
  
  const { loading, error, data } = useQuery(query);

  if (loading) {
    return <RandomCenterLoader />;
  }
  if (error) {
    return <ErrorPage message={error.message} ctx={props}/>
  }

  const bookshelfArr = data.getUserByUsername.listings.map(
    listing => <BookshelfItem key={`${listing.asin}/${listing.listed_on}`} listing={listing}/>
    );

  const bookshelf = bookshelfArr.length
    ? bookshelfArr
    : <div className="none-found">
        <p className="none-text">You don't have any books listed</p>
        <div className="none-prompt-block">
          <p>Click here to add one!</p>
          <div className="down-arrow" />
        </div>
      </div>

  return (
    <>
      <Header title="Your bookshelf" />
      <div className="bookshelf-grand-wrapper">
        <div className="bookshelf-list">
          {bookshelf}
        </div>
        <div className='bookshelf-footer-wrapper'>
          <Footer leftBut="userHome" centerBut="circleAdd" rightBut="search" />
        </div>
      </div>
    </>
  );
}