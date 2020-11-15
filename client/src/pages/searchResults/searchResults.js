import React from 'react';
import './searchResults.scss';
import { useQuery } from '@apollo/client';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SearchResultItem from '../../containers/BookItems/SearchResultItem';
import LoaderA from '../../components/Loaders/LoaderA';
import queryService from '../../services/queryService';

export default function SearchResultsPage (props) {
  const searchStr = props.match.params.string;
  const query = searchStr === '~~~recent'
    ? queryService.GET_RECENT()
    : queryService.GET_SEARCH(searchStr)

  const { loading, error, data } = useQuery(query);

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

  if (!resultsArr.length) {
    return (<>
    <Header title="Finding a book" />
    <div className="search-results-page-grand-wrapper">
      <h3>Showing results for: </h3>
      <p className="query-text">{searchStr}</p>
      <div className="no-results">
        <h1>No results found,<br />please try again</h1>
        <div className="white-space" />
      </div>
      <div className="search-results-footer-wrapper">
        <Footer leftBut="back" centerBut="circleAdd" rightBut="userHome" ctx={props}/>
      </div>
    </div>
    </>);
  }
  
  return(
    <>
    <Header title="Finding a book" />
    <div className="search-results-page-grand-wrapper">
      <h3>Showing results for: </h3>
      <p className="query-text">{searchStr === '~~~recent' ? 'Recently added books' : searchStr}</p>
      <div className="full-results-list">
        {resultsArr}
      </div>
      <div className="search-results-footer-wrapper">
        <Footer leftBut="back" centerBut="circleAdd" rightBut="userHome" ctx={props}/>
      </div>
    </div>
    </>
  );
}