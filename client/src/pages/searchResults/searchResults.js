import './searchResults.scss';
import { gql, useQuery } from '@apollo/client';
import Header from '../../components/Header';
import BackButton from '../../components/Buttons/BackButton';
import CircleAddButton from '../../components/Buttons/CircleAddButton';
import UserHomeButton from '../../components/Buttons/UserHomeButton';
import SearchResultItem from '../../containers/BookItems/SearchResultItem';
import LoaderA from '../../components/Loaders/LoaderA';




export default function SearchResultsPage (props) {
  const queryStr = props.match.params.string;
  const GET_SEARCH = queryStr === '~~~recent'
  ? gql`
      query {
        getSearchRecent {
          asin
          title
          author
          cover_art_url
          usernamesWith
          availCount
          summary
        }
      }
    `
  : gql`
      query {
        getSearch (text: "${queryStr}") {
          asin
          title
          author
          cover_art_url
          usernamesWith
          availCount
          summary
        }
      }
    `;
  
  const { loading, error, data } = useQuery(GET_SEARCH);

  if (loading) {
    return <LoaderA />;
  }
  if (error) {
    return <p> Error! ${error.message} </p>
  }

  const results = data.getSearch ? data.getSearch : data.getSearchRecent;
  const resultsArr = results
    .slice(0, 25)
    .filter(book => book.availCount !== '0')
    .sort((bookA, bookB) => bookB.availCount - bookA.availCount)
    .map((book, i) => <SearchResultItem key={i+'/'+book.asin} book={book}/>);

  return(
    <>
    <Header title="Finding a book" />
    <div className="search-results-page-grand-wrapper">
      <h3>Showing results for: </h3>
      <p className="query-text">{queryStr === '~~~recent' ? 'Recently added books' : queryStr}</p>
      <div className="full-results-list">
        {resultsArr}
      </div>
      <div className="search-results-footer">
        <BackButton ctx={props}/>
        <CircleAddButton />
        <UserHomeButton />
      </div>
    </div>
    </>
  );
};
