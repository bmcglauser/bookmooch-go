import React from 'react';
import { Link } from 'react-router-dom';
import './errorPage.scss';
import Header from '../../components/Header';

export default function ErrorPage ({ctx}) {
  let errorButtons;

  const startOverButton = 
    <Link to="/" style={{textDecoration:'none'}} >
      <div className="error-button">
        <div className="home icon" />
        <p>Start Over</p>
      </div>
    </Link>;

  if (ctx) {
    errorButtons =
      <div className="error-buttons-wrapper">
        <div onClick={()=>ctx.history.goBack()} className="error-button">
          <div className="back icon" />
          <p>Go Back</p>
        </div>
        {startOverButton}
      </div>
  } else {
    errorButtons = 
      <div className="error-buttons-wrapper">
        {startOverButton}
      </div>;
  }

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
      {errorButtons}
    </div>
    </>
  );
}