import React, { FunctionComponent } from 'react';
import './SearchButton.scss';
import { Link } from 'react-router-dom';

const SearchButton: FunctionComponent = () => 
  <Link to='/search' style={{textDecoration:'none'}}>
    <div className="search-button-wrapper">
      <button className="search-button" />
      <p>Find a Book</p>
    </div>
  </Link>;

export default SearchButton;