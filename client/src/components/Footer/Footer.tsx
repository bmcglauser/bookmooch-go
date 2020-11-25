import React from 'react';
import './Footer.scss';
import buttons from '../FooterButtons';
import { RouteComponentProps } from 'react-router-dom'

function whichButton (inputStr?: string, props?: RouteComponentProps): JSX.Element {
  if (inputStr === 'back' && props) {
    return <buttons.BackButton ctx={props} />;
  }
  switch(inputStr) {     
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

type FooterProps = {
  leftBut?: string,
  centerBut?: string,
  rightBut?: string,
  ctx?: RouteComponentProps
}

export default function Footer (props: FooterProps): JSX.Element {
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