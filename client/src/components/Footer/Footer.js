import React from 'react';
import './Footer.scss';
import buttons from '../FooterButtons';

function whichButton (inputStr, props) {
  switch(inputStr) {
    case 'back':
      return <buttons.BackButton ctx={props} />;
    case 'circleAdd':
      return <buttons.CircleAddButton />;
    case 'search':
      return <buttons.SearchButton />;
    case 'userHome':
      return <buttons.UserHomeButton />;
    default:
      return <div />;
  }
}

export default function Footer (props) {
  const {leftBut, centerBut, rightBut, ctx} = props
  return (
    <div className="footer-grand-wrapper">
      <div className="small-button">
        {whichButton(leftBut, ctx)}
      </div>
      {whichButton(centerBut, ctx)}
      <div className="small-button">
        {whichButton(rightBut, ctx)}
      </div>
    </div>
  );
}