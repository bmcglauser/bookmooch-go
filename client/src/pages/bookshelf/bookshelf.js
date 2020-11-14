import React from 'react';
import { useQuery } from '@apollo/client';
import './bookshelf.scss';
import Header from '../../components/Header';
import BookshelfItem from '../../containers/BookItems/BookshelfItem';
import CircleAddButton from '../../components/Buttons/CircleAddButton';
import UserHomeButton from '../../components/Buttons/UserHomeButton';
import SearchButton from '../../components/Buttons/SearchButton';
import RandomCenterLoader from '../../components/Loaders/RandomCenterLoader';
import queryService from '../../services/queryService';


export default function BookshelfPage (props) {
  const username = props.match.params.username;
  const query = queryService.GET_BOOKSHELF(username);
  
  const { loading, error, data } = useQuery(query);

  if (loading) {
    return <RandomCenterLoader />;
  }
  if (error) {
    return <p> Error! ${error.message} </p>
  }

  const bookshelfArr = data.getUserByUsername.listings.map(
    listing => <BookshelfItem key={`${listing.asin}/${listing.listed_on}`} listing={listing}/>
    );

  return (
    <>
      <Header title="Your bookshelf" />
      <div className="bookshelf-grand-wrapper">
        <div className="bookshelf-list">
          {bookshelfArr}
        </div>
        <div className='bookshelf-footer'>
          <div className="footer-button">
            <UserHomeButton />
          </div>
          <CircleAddButton />
          <div className="footer-button">
            <SearchButton />
          </div>
        </div>
      </div>
    </>
  );
}