import React from 'react';
import './SearchButton.scss';
import { Link } from 'react-router-dom';

export default function SearchButton () : JSX.Element {
  return (
    <Link to='/search' style={{textDecoration:'none'}}>
      <div className="search-button-wrapper">
        <button className="search-button" />
        <p>Find a Book</p>
      </div>
    </Link>
  );
}