import React from 'react';
import './findAdd.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Header from '../../components/Header';
import UserHomeButton from '../../components/FooterButtons/UserHomeButton';

export default function FindAddPage(): JSX.Element {
  const [searchText, setSearchText] = useState('');
  return (
    <>
    <Header title={"Find a book to add"}/>
    <div className="add-page-grand-wrapper">
      <div className="find-book-to-add">
        <div className="top-block">
          <h2>Enter the ISBN or ASIN code here</h2>
          <input onChange={e=>setSearchText(e.target.value)}type="text" />
        </div>
        <p>
  Click below to find the book you want to add. On the book's details page you'll be able to "Add this book to give away"
        </p>
        <Link to={`/searchresults/${searchText}/true`} style={{textDecoration:'none'}}>
          <button className="find-add-button">
            <p>
              Find my<br />book to add
            </p>
          </button>
        </Link>
      </div>
      <div className="add-page-footer">
        <UserHomeButton />
        <p>for books not yet in the catalogue, you'll have to enter the details manually on desktop</p>
      </div>
    </div>
    </>
  );
}