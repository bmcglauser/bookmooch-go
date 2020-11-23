import React from 'react';
import './searchResults.scss';
import { useQuery } from '@apollo/client';
import { RouteComponentProps } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ErrorPage from '../errorPage';
import SearchResultItem from '../../containers/BookItems/SearchResultItem';
import LoaderA from '../../components/Loaders/LoaderA';
import queryService from '../../services/queryService';
import { Book } from '../../services/queryService/queryServiceInterfaces';

type TParams = {
  string: string
  toadd: string
}

interface Data {
  getSearch?: Book[];
  getSearchRecent?: Book[];
}

export default function SearchResultsPage (props: RouteComponentProps<TParams>): JSX.Element {
  const searchStr = props.match.params.string;
  const toAdd = props.match.params.toadd === 'true' ? true : false;

  const query = searchStr === '~~~recent'
    ? queryService.GET_RECENT()
    : queryService.GET_SEARCH(searchStr)

  const { loading, error, data } = useQuery<Data>(query);

  if (loading) return <LoaderA />;
  if (error) return <ErrorPage message={error.message} ctx={props}/>

  let results = data?.getSearch ? data.getSearch : data?.getSearchRecent;
  if (!toAdd) {results = results?.filter(book => book.availCount !== '0')}

  const resultsArr = results?.slice(0, 25)
    .sort((bookA, bookB) => parseInt(bookB.availCount) - parseInt(bookA.availCount))
    .map((book, i) => <SearchResultItem key={i+'/'+book.asin} book={book}/>);

  let content;
  if (!resultsArr?.length) {
    content =
      <div className="no-results">
        <h1>No results found,<br />please try again</h1>
        <div className="white-space" />
      </div>
    ;
  } else {
    content =
      <div className="full-results-list">
        {resultsArr}
      </div>
    ;
  }

  return(
    <>
    <Header title="Finding a book" />
    <div className="search-results-page-grand-wrapper">
      <h3>Showing results for: </h3>
      <p className="query-text">{searchStr === '~~~recent' ? 'Recently added books' : searchStr}</p>
      {content}
      <div className="search-results-footer-wrapper">
        <Footer leftBut="back" centerBut="circleAdd" rightBut="userHome" ctx={props}/>
      </div>
    </div>
    </>
  );
}