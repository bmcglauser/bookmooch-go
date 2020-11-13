import './bookshelf.scss'
import Header from '../../components/Header';
import BookshelfItem from '../../containers/BookItems/BookshelfItem';
import CircleAddButton from '../../components/Buttons/CircleAddButton'
import UserHomeButton from '../../components/Buttons/UserHomeButton';
import SearchButton from '../../components/Buttons/SearchButton';

import { gql, useQuery } from '@apollo/client';
import LoaderA from '../../components/Loaders/LoaderA';


export default function BookshelfPage (props) {
  const username = props.match.params.username;
  const GET_BOOKSHELF = gql`
  query {
    getUserByUsername (username: "${username}") {
      username
      listings {
        asin
        book {
          title
          author
        }
        listed_on
      }
    }
  }
  `;
  const { loading, error, data } = useQuery(GET_BOOKSHELF);


  if (loading) {
    return <LoaderA />;
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