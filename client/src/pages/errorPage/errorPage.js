import React from 'react';
import { Link } from 'react-router-dom';
import './errorPage.scss';
import Header from '../../components/Header';

export default function ErrorPage (props) {
  return (
    <>
    <Header title="404: Not Found" />
    <div className="error-block-grand-wrapper">
      <div className="error-icon-wrapper">
        <div className="error-icon" />
      </div>
      <div className="error-text">
        <h3>Uh oh! Looks like there was a problem loading the page...</h3>
      </div>
      <div className="error-buttons-wrapper">
        <div onClick={()=>props.history.goBack()} className="error-button">
          <div className="back icon" />
          <p>Go Back</p>
        </div>
        <Link to="/" style={{textDecoration:'none'}} >
          <div className="error-button">
            <div className="home icon" />
            <p>Go home</p>
          </div>
        </Link>
      </div>
    </div>
    </>
  );
}